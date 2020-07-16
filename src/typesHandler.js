const {
  TemplateParser,
  ScriptParser,
  StyleParser
} = require('./parser');

const typesHandler = {
  template: function({ content }) {
    const templateParser = new TemplateParser({
      parser: this.options.templateParser,
    });
    return templateParser.parse(content);
  },
  script: function({ content }) {
    const scriptParser = new ScriptParser({
      parser: this.options.scriptParser,
    });
    return scriptParser.parse(content);
  },
  styles: function(styles) {
    return Promise.all(
      styles.map(({ content, lang }) => {
        const styleParser = new StyleParser({
          parser: this.options.styleParser,
          lang,
        });
        return styleParser.parse(content);
      })
    ).then((res) => {
      return res.reduce((total, content) => {
        return total += content;
      }, '');
    })
  }
}

module.exports = {
  typesHandler
}