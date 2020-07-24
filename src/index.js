const path = require('path');
const fs = require('fs-extra');
const { spawn } = require('child_process');
const vueCompiler = require('vue-template-compiler');
const Watch = require('./watch');
const { getOptions } = require('./options');
const { TemplateParser } = require('./parser');
const { webpackPromise } = require('./webpack');
const {
  ENTRY_DIR,
  ENTRY_FILE_NAME,
  OUTPUT,
  VUE_TEMPLATE
} = require('./config');

const cwdPath = process.cwd();

class VueCube {
  constructor({
    entryDir = ENTRY_DIR,
    entryFileName = ENTRY_FILE_NAME,
    output = OUTPUT,
    options = {}
  }) {
    this.entryDir = entryDir;
    this.entry = path.join(entryDir, entryFileName);
    this.outputPath = output;
    this.options = getOptions(options);
  }

  auto() {
    this.build().then((res) => {
      this.run().watching();
    })
  }

  build() {
    const { entry } = this;
    if (!this._isVueFile(entry)) {
      return Promise.reject(new Error('The entry is not a Vue file.'));
    }
    return this._readEntryFile(entry).then((entryCode) => {
      const outputPath = this.outputPath;
      const runtimePath = path.resolve(__dirname, './runtime/index.js');
      const entryPath = path.resolve(cwdPath, outputPath, './cube.js');
      const runtimeInject = fs.readFileSync(runtimePath);

      fs.writeFileSync(entryPath, `
        import cube from '${path.resolve(cwdPath, entry)}'
        ${runtimeInject}
        export default $__inject(cube);
      `)

      return webpackPromise(entryPath, outputPath).then(() => {
        const output = vueCompiler.parseComponent(entryCode);
        return this._outputTemplate(output.template.content);
      })
    })
  }


  run() {
    spawn('cubetool', ['run'], { stdio: 'inherit' });
    return new Watch({
      path: this.entryDir,
      context: this
    });
  }

  rebuild() {
    this.build().then(() => {})
  }

  _outputTemplate(template) {
    const templateParser = new TemplateParser();
    return templateParser.parse(template).then((result) => {
      fs.writeFileSync(path.resolve(this.outputPath, './cube.tpl'), result)
      return {
        error: null
      };
    })
  }

  _readEntryFile(filePath) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        return fs.ensureFile(filePath).then(() => {
          fs.writeFileSync(filePath, VUE_TEMPLATE)
          resolve(VUE_TEMPLATE)
        });
      }
      return fs.readFile(filePath, 'utf-8', (error, code) => {
        if (error) return reject(error);
        resolve(code)
      });
    })
  }

  _isVueFile(filePath) {
    return this.options.vueFileExtensions.indexOf(path.extname(filePath)) != -1 || /\.vue$/.test(filePath);
  }

}

module.exports = VueCube;