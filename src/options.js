function getOptions(options) {
  return Object.assign({
    vueFileExtensions: [],
    templateParser: null,
    scriptParser: null,
    styleParser: null
  }, options)
}

module.exports = {
  getOptions
};