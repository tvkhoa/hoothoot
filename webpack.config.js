/* global __dirname, require, module */

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
//
// const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const libraryName = 'index';

const plugins = [];
let outputFile;

if (env === 'build') {
  // plugins.push(new UglifyJsPlugin({ minimize: true }));
  // plugins.push(new LodashModuleReplacementPlugin({
  //   collections: true,
  //   paths: true,
  // }));
  outputFile = libraryName + '.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.json', '.js'],
  },
  plugins: plugins,
  externals : {
    lodash : {
      commonjs: "lodash",
      amd: "lodash",
      root: "_" // indicates global variable
    }
  },
};

module.exports = config;
