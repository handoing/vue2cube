class StyleParser {
  constructor({ lang, parser }) {
    this.lang = lang
    this.parser = parser
  }
  parse(content) {

    if (this.parser) {
      return this.parser(content)
    }

    if (this.lang === 'less') {
      return new Promise((resolve, reject) => {
        const less = require('less');
        less.render(content, function (error, output) {
          if (error) return reject(error);
          resolve(output.css);
        });
      })
    }

    return content;
  }
}

module.exports = StyleParser;