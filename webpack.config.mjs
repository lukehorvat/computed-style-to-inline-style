import path from 'node:path';
import webpack from 'webpack';

const { dirname } = import.meta;

/** @type { webpack.Configuration } */
export default {
  entry: path.join(dirname, 'lib/index.ts'),
  output: {
    path: path.join(dirname, 'dist'),
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
