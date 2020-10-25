const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: {
    server: './src/index.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
