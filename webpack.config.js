const path = require('path');
const webpack = require('webpack');

/** @type { webpack.Configuration } */
module.exports = {
  entry: path.join(__dirname, 'lib/index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      type: 'umd',
      name: 'computedStyleToInlineStyle',
    },
    globalObject: 'this',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          onlyCompileBundledFiles: true,
        },
      },
    ],
  },
};
