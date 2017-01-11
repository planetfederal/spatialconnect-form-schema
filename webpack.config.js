var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    './web/index': './src/index.js'
  },
  output: {
    library: 'scformschema',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'slider': './slider',
      'counter': './counter',
      'photo': './photo',
      'text': './text',
    }
  },
  externals: {
    'react': 'react',
    'react-native': 'react-native',
    'react-native-slider': 'react-native-slider',
    'react-native-image-picker': 'react-native-image-picker'
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
        loader: 'babel'
      }
    ]
  }
};
