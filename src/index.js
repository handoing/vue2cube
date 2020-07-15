const path = require('path');
const fs = require('fs-extra');
const { spawn } = require('child_process');
const { getOptions } = require('./options');
const {
  ENTRY,
  OUTPUT,
  VUE_TEMPLATE,
  TYPE_TO_FILENAME
} = require('./config');
const Watch = require('./watch');

class VueCube {
  constructor({
    entry = ENTRY,
    output = OUTPUT,
    options = {}
  }) {
    this.entry = entry;
    this.outputPath = output;
    this.options = getOptions(options);

    this.compiler = this.options.compiler;
    this.typesHandler = this.options.typesHandler;
    this.vueFileExtensions = this.options.vueFileExtensions;
  }

  auto() {
    this.build().then((res) => {
      this.output(res).watching();
      this.run();
    })
  }

  build() {
    const { entry } = this;
    if (!this._isVueFile(entry)) {
      return Promise.reject(new Error('Not .vue file'));
    }
    return this._convert(entry)
  }

  output(result) {
    result.forEach(({ type, data }) => {
      const distPath = path.resolve(this.outputPath, TYPE_TO_FILENAME[type]);
      fs.outputFileSync(distPath, data)
    })
    return new Watch({
      path: this.entry,
      context: this
    });
  }

  run() {
    return spawn('cubetool', ['run'], { stdio: 'inherit' });
  }

  rebuild() {
    this.build().then((res) => this.output(res))
  }

  _isVueFile(filePath) {
    return this.vueFileExtensions.indexOf(path.extname(filePath)) != -1 || /\.vue$/.test(filePath);
  }

  _convert(filePath) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, VUE_TEMPLATE)
      }
      fs.readFile(filePath, 'utf-8', (error, code) => {
        if (error) return reject(error);
        this._fileHandle(code, filePath, resolve);
      });
    })
  }

  _fileHandle(code, filePath, callback) {
    const output = this.compiler.parseComponent(code);
    const typesHandler = this.typesHandler;
    const typeList = Object.keys(output);
    return Promise.all(
      typeList.map(typeName => {
        if (typeName in typesHandler) {
          return typesHandler[typeName].call(this, output[typeName])
        }
      }).filter(item => item)
    ).then((res) => {
      callback(res.map((code, index) => {
        return {
          type: typeList[index],
          data: code
        }
      }))
    })
  }
}

module.exports = VueCube;