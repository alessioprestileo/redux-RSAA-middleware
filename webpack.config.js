const prodConfig = require('./webpack.config.prod');
const devConfig = require('./webpack.config.dev');

module.exports = (env) => {
  switch (env.NODE_ENV) {
    case 'production':
      return prodConfig;
    case 'development':
      return devConfig;
    default:
      return devConfig;
  }
};
