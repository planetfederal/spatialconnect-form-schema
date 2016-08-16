var path = require('path');

module.exports = {
  entry: {
    './native/index': './src/index.js'
  },
  output: {
    library: 'scformschema',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'slider': './slider.native',
      'counter': './counter.native',
      'photo': './photo.native',
      'text': './text.native'
    }
  },
  externals: {
    'react': 'react',
    'react-native': 'react-native',
    'react-native-slider': 'react-native-slider',
    'react-native-image-picker': 'react-native-image-picker'
  },
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
