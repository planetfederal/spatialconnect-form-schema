var path = require('path');

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
