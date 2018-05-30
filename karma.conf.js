module.exports = (config) => {
  var testWebpackConfig = require('./config/webpack.test')({env: 'test'});

  var karmaConfig = {

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      { pattern: './config/spec-bundle.js', watched: false }
    ],

    // mime: {
    //   'text/x-typescript':  ['ts']
    // },

    exclude: [],

    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    webpack: testWebpackConfig,

    webpackMiddleware: { stats: 'errors-only'},

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome'],

    singleRun: true,

    concurrency: Infinity
  };

  config.set(karmaConfig);
}
