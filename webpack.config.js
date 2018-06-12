const path = require('path')

let config = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd',
    library: 'kambi-offering-api-module',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config = Object.assign(config, {
      optimizations: {
        minimize: false,
      },
    })
  }
  return config
}
