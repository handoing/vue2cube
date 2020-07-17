const compiler = require('vue-template-compiler');
module.exports = function(content, map, meta) {
  const output = compiler.parseComponent(content);
  const typeList = Object.keys(output);
  let script = '';
  typeList.map(typeName => {
    if (typeName === 'script') {
      script = output[typeName].content
    }
  })
  return script;
};