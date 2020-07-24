const fs = require('fs-extra');
const path = require('path');

const VUE_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './template.vue'), 'utf-8');

module.exports = {
  ENTRY_DIR: './vue',
  ENTRY_FILE_NAME: 'cube.vue',
  OUTPUT: './src',
  VUE_TEMPLATE
};