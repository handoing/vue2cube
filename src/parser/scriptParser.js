class ScriptParser {
  constructor({ parser }) {
    this.parser = parser
  }
  parse(content) {
    if (this.parser) {
      return this.parser(content)
    }
    return content
  }
}

module.exports = ScriptParser;