const prodConfig = require('./webpack.config.prod');
const devConfig = require('./webpack.config.dev');

module.exports = (env) => {
  switch (env.BUILD_TYPE) {
    case 'PRODUCTION':
      return prodConfig;
    case 'DEVELOPMENT':
      return devConfig;
    default:
      return devConfig;
  }
};
