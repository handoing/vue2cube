const compiler = require('vue-template-compiler');
const { typesHandler } = require('./typesHandler');

function getOptions(options) {
  return Object.assign({
    compiler,
    typesHandler,
    vueFileExtensions: [],
    templateParser: null,
    scriptParser: null,
    styleParser: null
  }, options)
}

module.exports = {
  getOptions
};