const path = require('path');
const fs = require('fs-extra');
const espree = require("espree");
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const {
  builders
} = require('ast-types');

const ExportDefaultMap = {
  data(node) {
    if (node.value.type === 'FunctionExpression') {
      node.method = false;
      node.value = builders.callExpression(node.value, []);
      return node;
    }
  },
  created(node) {
    if (node.value.type === 'FunctionExpression') {
      node.key.name = 'onLoad';
      return node;
    }
  },
  mounted(node) {
    if (node.value.type === 'FunctionExpression') {
      node.key.name = 'onReady';
      return node;
    }
  },
  destroyed(node) {
    if (node.value.type === 'FunctionExpression') {
      node.key.name = 'onUnload';
      return node;
    }
  },
  methods(node) {
    if (node.value.type === 'ObjectExpression') {
      return node.value.properties;
    }
  }
};

class ScriptParser {
  constructor({ parser }) {
    this.parser = parser;
  }
  parse(content) {
    if (this.parser) {
      return this.parser(content)
    }

    const ast = espree.parse(content, {
      ecmaVersion: 6,
      sourceType: "module",
    });
    this.traverse(ast)
    return this.generate(ast)
  }
  generate(ast) {
    const runtimePath = path.resolve(__dirname, './runtime/index.js');
    const runtime = fs.readFileSync(runtimePath, 'utf-8');
    return `${runtime}\n\n${escodegen.generate(ast)}`
  }
  traverse(ast) {
    const self = this;
    estraverse.traverse(ast, {
      enter(node) {
        if (node.type === 'ExportDefaultDeclaration' && node.declaration.type === 'ObjectExpression') {
          node.declaration = builders.callExpression(
            builders.identifier("$__inject"),
            [ node.declaration ]
          );
          return node
        }

        // if (node.type === 'ExportDefaultDeclaration' && node.declaration.type === 'ObjectExpression') {
        //   node.declaration.properties = self.exportDefaultPropsHandle(node.declaration.properties)
        //   return node
        // }

        // if (
        //   node.type === 'ExpressionStatement' &&
        //   node.expression.type === 'AssignmentExpression' &&
        //   node.expression.left.type === 'MemberExpression'
        // ) {
        //   if (node.expression.left.object.type === 'ThisExpression') {
        //     node.expression = self.expressSetDataHandle(node.expression)
        //     return node;
        //   }
        // }
      },
      leave(node) {}
    });
  }
  exportDefaultPropsHandle(properties) {
    return properties.map((property) => {
      const propName = property.key.name;
      if (ExportDefaultMap[propName]) {
        const prop = ExportDefaultMap[propName](property)
        if (prop) {
          return prop
        }
      }
      return property
    }).flat();
  }
  expressSetDataHandle(node) {
    const dataName = node.left.property.name;
    const right = this.expressDataHandle(node.right);
    return builders.callExpression(
      builders.memberExpression(
        builders.thisExpression(),
        builders.identifier("setData"),
        false
      ), [
        builders.objectExpression([
          builders.property(
            'init',
            builders.identifier(dataName),
            right
          ) 
        ])
      ]
    );
  }
  expressDataHandle(node) {
    if (node.type === 'CallExpression') {
      return builders.callExpression(
        this.expressDataHandle(node.callee),
        node.arguments
      )
    }
    if (node.type === 'MemberExpression') {
      return builders.memberExpression(
        this.expressDataHandle(node.object),
        node.property,
        false
      )
    }
    if (node.type === 'ThisExpression') {
      return builders.memberExpression(
        builders.thisExpression(),
        builders.identifier("data"),
        false
      )
    }
  }
}

module.exports = ScriptParser;