const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderPath = path.resolve(__dirname, 'loader', './vue-loader.js');

module.exports = {
  mode: 'development',
  output: {
    filename: 'cube.js',
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: { loader: vueLoaderPath }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'cube.css',
    })
  ]
}