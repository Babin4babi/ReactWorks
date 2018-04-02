var webpack = require('webpack');
var path = require('path');
var config = {
  entry: './main.js',
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: 'bundle.js'
    },
  devServer: {
    inline: true,
    port: 8082
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]

}
module.exports = config;