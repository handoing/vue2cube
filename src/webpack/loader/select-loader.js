const { splitContent } = require('../utils');
module.exports = function(content, map, meta) {
  const callback = this.async();
  let { styles } = splitContent(content);
  styles.then((css) => {
    callback(null, css, map, meta);
  });
};
