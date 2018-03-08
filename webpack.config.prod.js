const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanupPlugin = require('webpack-cleanup-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.jsx',
    vendor: [require.resolve('react'), require.resolve('react-dom')],
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'build_prod'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              forceEnv: 'production',
            },
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [require.resolve('css-loader'), require.resolve('sass-loader')],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 30000,
              fallback: require.resolve('file-loader'),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CleanupPlugin(),
    new UglifyJsPlugin(),
    new ExtractTextPlugin({ filename: 'app.bundle.css' }),
    new HtmlWebpackPlugin({ template: 'index.template.html' }),
    new CopyWebpackPlugin([{ from: './src/assets', to: './assets' }]),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
  ],
};
