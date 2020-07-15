const chokidar = require('chokidar');

class Watch {
  constructor({ path, context }) {
    this.path = path;
    this.context = context;
  }
  watching() {
    const { path, context } = this;
    chokidar
      .watch([ path ])
      .on('change', (_path) => {
        context.rebuild.call(context);
      })
      .on('ready', () => {})
      .on('error', () => {});
  }
}

module.exports = Watch;