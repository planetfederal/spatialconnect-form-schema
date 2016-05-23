var path = require('path');

module.exports = {
  entry: {
    './web/index': './src/index.js',
    './web/test' : './test/test.js'
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
    }
  },
  externals: {
    'react': 'react',
    'react-native': 'react-native',
    'react-native-slider': 'react-native-slider'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
