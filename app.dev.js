const express = require('express');
const webpack = require('webpack');
const webpackConfigFunc = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line import/no-extraneous-dependencies
const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

const app = express();
const webpackConfig = webpackConfigFunc('DEVELOPMENT');
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

app.set('port', process.env.PORT || 3000);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build_dev/index.html'));
});

app.listen(app.get('port'), (err) => {
  if (err) {
    return console.error(err);
  }

  return console.log('Listening on port ', app.get('port'));
});
