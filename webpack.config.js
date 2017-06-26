var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    './web/index': './src/index.js',
  },
  output: {
    library: 'scformschema',
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      slider: './slider',
      counter: './counter',
      photo: './photo',
      text: './text',
      SCForm: './SCForm',
    },
  },
  externals: {
    react: 'react',
    'react-native': 'react-native',
    'react-native-slider': 'react-native-slider',
    'react-native-button': 'react-native-button',
    'react-native-image-picker': 'react-native-image-picker',
    'tcomb-form-native': 'tcomb-form-native',
    'tcomb-json-schema': 'tcomb-json-schema',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
    ],
  },
};
