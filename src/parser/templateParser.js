const { Parser, DomHandler, DomUtils } = require('htmlparser2');

const attrTransformMap = {
  'v-show': {
    key: 'c-show',
    value: function(str) {
      return `{{${str}}}`
    }
  },
  'v-model': {
    key: 'c-model',
    value: function(str) {
      return `{{${str}}}`
    }
  },
  'v-html': {
    key: 'c-html',
    value: function(str) {
      return `{{${str}}}`
    }
  },
  'v-for': {
    handle: function(node, value) {
      const each = value.split(' in ');
      const [ item, index ] = each[0].replace(/\(/, '').replace(/\)/, '').split(',');
      const key = node.attribs[':key'] || node.attribs['v-bind:key']
      const target = each[1];
      const start = {
        type: 'text',
        data: `\n{{#list ${target.trim()} as ${item.trim()}${key ? ` by ${key}` : ''}}}\n`
      }
      const end = {
        type: 'text',
        data: '\n{{/list}}\n'
      }
      DomUtils.prepend(node, start)
      DomUtils.append(node, end)
    }
  },
  'v-if': {
    handle: function(node, value) {
      const start = {
        type: 'text',
        data: `\n{{#if ${value}}}\n`
      }
      const end = {
        type: 'text',
        data: `\n{{/if}}\n`
      }
      DomUtils.prepend(node, start)
      DomUtils.append(node, end)
    }
  },
  'v-else-if': {
    handle: function(node, value) {
      const start = {
        type: 'text',
        data: `\n{{#elseif ${value}}}\n`
      }
      const end = {
        type: 'text',
        data: `\n{{/if}}\n`
      }
      if (node.prev.prev.data === end.data) {
        DomUtils.removeElement(node.prev.prev)
      }
      DomUtils.prepend(node, start)
      DomUtils.append(node, end)
    }
  },
  'v-else': {
    handle: function(node, value) {
      const start = {
        type: 'text',
        data: `\n{{#else}}\n`
      }
      const end = {
        type: 'text',
        data: `\n{{/if}}\n`
      }
      if (node.prev.prev.data === end.data) {
        DomUtils.removeElement(node.prev.prev)
      }
      DomUtils.prepend(node, start)
      DomUtils.append(node, end)
    }
  },
  'v-text': {
    handle: function(node, value) {
      node.children = []
      DomUtils.appendChild(node, {
        type: 'text',
        data: `{{${value}}}`
      })
    }
  }
}

class TemplateParser {
  constructor({ parser } = {}) {
    this.parser = parser
  }
  parse(content) {
    if (this.parser) {
      return this.parser(content)
    }
    return this.parseTemplate(content).then((ast) => {
      const transformedAST = this.templateTransform(ast)
      return this.astToString(transformedAST)
    })
  }
  parseTemplate(text) {
    return new Promise((resolve, reject) => {
      const handler = new DomHandler((error, dom)=>{
        if (error) return reject(error);
        resolve(dom);
      });
      const parser = new Parser(handler, {
        lowerCaseTags: false
      });
      parser.write(text);
      parser.end();
    });
  }
  templateTransform(ast) {
    for (let i = 0; i < ast.length; i++) {
      let node = ast[i]
  
      if (node.type === 'tag') {
        let attrs = {}
        for (let attrName in node.attribs) {
          this.attrTransformHandle(attrName, node, attrs)
        }
        node.attribs = attrs
      }
  
      if(node.children){
        this.templateTransform(node.children)
      }
    }
  
    return ast
  }
  astToString(ast) {
    return ast.reduce((str, item) => {
      if (item.type === 'text') {
        str += item.data;
      } else if (item.type === 'tag') {
        str += `<${item.name}`;
        if (item.attribs) {
          Object.keys(item.attribs).forEach(attr => {
            str += ` ${attr}="${item.attribs[attr]}"`;
          });
        }
        str += '>';
        if (item.children && item.children.length) {
          str += this.astToString(item.children);
        }
        if (['img', 'br', 'hr', 'input'].indexOf(item.name) === -1) {
          str += `</${item.name}>`;
        }
      }
      return str;
    }, '');
  }
  attrTransformHandle(attrName, node, attrs) {
    const matchBind = attrName.match(/^(v-bind:|:).*$/)
    if (matchBind) {
      const name = attrName.slice(matchBind[1].length)
      if (name === 'key') {
        return
      }
      if (name === 'class' || name === 'style') {
        attrs[`c-${name}`] = node.attribs[attrName];
        return
      }
      const [ value, ...filterExpList ] = node.attribs[attrName].split('|');
      const filter = filterExpList.reduce((total, filterExp) => {
        let suffix = this.getFilterExpSuffix(filterExp.trim());
        return total += suffix
      }, '')
      attrs[name] = `{{${value}${filter}}}`
      return;
    }

    const matchOn = attrName.match(/^(v-on:|@).*$/)
    if (matchOn) {
      const name = attrName.slice(matchOn[1].length)
      const value = node.attribs[attrName];
      attrs[`on-${name}`] = `{{this.${value}}}`
      return;
    }


    const target = attrTransformMap[attrName]
    this.setAttributes(target, attrName, node, attrs)
  }
  getFilterExpSuffix(exp) {
    if (exp) {
      const expName = exp.match(/([^\(]+)/)[0];
      const param = exp.slice(expName.length + 1, exp.length - 1)
      return ` | ${expName}: ${param}`;
    }
    return '';
  }
  setAttributes(target, attrName, node, attrs) {
    if (target) {
      if (target['key']) {
        attrs[target['key']] = target['value'] ? target['value'](node.attribs[attrName]) : node.attribs[attrName]
      } else {
        target['handle'](node, node.attribs[attrName])
      }
    } else {
      attrs[attrName] = node.attribs[attrName]
    }
  }
}

module.exports = TemplateParser;