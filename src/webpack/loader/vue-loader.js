const path = require('path');
const loaderUtils = require('loader-utils');
const espree = require("espree");
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const {
  builders
} = require('ast-types');
const { TemplateParser } = require('../../parser');
const { splitContent } = require('../utils');

function traverse(ast, tpl) {
  estraverse.traverse(ast, {
    enter(node) {
      if (node.type === 'ExportDefaultDeclaration' && node.declaration.type === 'ObjectExpression') {
        node.declaration.properties.push(builders.property(
          'init',
          builders.identifier('template'),
          builders.literal(tpl)
        ));
        return node
      }
    },
    leave(node) {}
  });
}

function getRequire(loader, filePath) {
  const loaderPath = loaderUtils.stringifyRequest(
    loader,
    '!!' +
    `${path.resolve(__dirname, '../../../', 'node_modules/mini-css-extract-plugin/dist/loader.js')}!` +
    `${path.resolve(__dirname, '../../../', 'node_modules/css-loader/dist/index.js')}!` +
    `${path.resolve(__dirname, './select-loader.js')}!${filePath}`
  );
  return 'require(' + loaderPath + ')\n'
}

module.exports = function(content, map, meta) {
  const callback = this.async();
  const filePath = this.resourcePath;
  let { tpl, script } = splitContent(content);

  const templateParser = new TemplateParser();
  templateParser.parse(tpl).then((result) => {
    const ast = espree.parse(script, {
      ecmaVersion: 6,
      sourceType: "module",
    });
    traverse(ast, result);
    script = escodegen.generate(ast);
    callback(null, `${getRequire(this, filePath)}\n${script}`, map, meta);
  })
};