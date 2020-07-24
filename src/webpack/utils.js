const compiler = require('vue-template-compiler');
const less = require('less');

function splitContent(content) {
  const output = compiler.parseComponent(content);
  return Object.keys(output).reduce((result, typeName) => {
    if (typeName === 'template') {
      result.tpl = output[typeName].content
    }
    if (typeName === 'script') {
      result.script = output[typeName].content
    }
    if (typeName === 'styles') {
      result.styles = Promise.all(
        output[typeName].map((style) => {
          return new Promise((resolve, reject) => {
            if (style.lang === 'less') {
              less.render(style.content, function (error, output) {
                if (error) return reject(error);
                resolve(output.css);
              });
            } else {
              resolve(style.content);
            }
          })
        })
      ).then((result) => {
        return result.reduce((content, css) => {
          return content + css;
        }, '')
      })
    }
    return result
  }, {});
}

module.exports = {
  splitContent
};