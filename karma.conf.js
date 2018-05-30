// Karma configuration
// Generated on Tue May 29 2018 15:03:59 GMT-0400 (EDT)

module.exports = (config) => {
  var testWebpackConfig = require('./config/webpack.test.js')({env: 'test'});

  var karmaConfig = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: './config/spec-bundle.js', watched: false }
    ],

    // files: [
    //   'src/**/*.spec.ts'
    // ],


    // list of files / patterns to exclude
    exclude: [
    ],

    // mime: {
    //   'text/x-typescript': ['ts','tsx']
    // },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    // preprocessors: {
    //   'src/**/*.spec.ts': ['coverage', 'webpack', 'sourcemap']
    // },

    webpack: testWebpackConfig,

    webpackMiddleware: { stats: 'errors-only'},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  config.set(karmaConfig);
}
