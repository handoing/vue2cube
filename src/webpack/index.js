const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');

function webpackPromise(entry, output) {
  return new Promise((resolve, reject) => {
    const webpackConfig = merge(baseWebpackConfig, {
      entry: entry,
      output: {
        path: path.resolve(process.cwd(), output),
      }
    });
    const compiler = webpack(webpackConfig);
    compiler.run((error, stats) => {
      if (error || stats.hasErrors()) {
        console.log(stats.toString({
          chunks: false,
          colors: true
        }));
        reject(error);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  webpackPromise
};