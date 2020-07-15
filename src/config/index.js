const fs = require('fs-extra');
const path = require('path');

const VUE_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './default.vue'), 'utf-8');

const TYPE_TO_FILENAME = {
  'template': 'cube.tpl',
  'script': 'cube.js',
  'styles': 'cube.css',
}

module.exports = {
  ENTRY: './cube.vue',
  OUTPUT: './src',
  VUE_TEMPLATE,
  TYPE_TO_FILENAME
};