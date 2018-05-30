const helpers = require('./helpers');
const webpack = require('webpack');
const path = require('path');

/**
 * Webpack Plugins
 */
const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

// ExtractTextPlugin
const extractCSS = new ExtractTextPlugin({
  filename: '[name].[id].css',
  allChunks: true
});

module.exports = {
  devServer: {
    stats: 'minimal',
    inline: true
  },

  devtool: 'cheap-module-eval-source-map',

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/demo-aot.ts'
  },

  mode: 'development',

  resolve: {
    extensions: ['.webpack.js', '.wep.js', '.js', '.ts']
  },

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          '@ngtools/webpack'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        use: ['html-loader']
      }, {
        test: /node_modules\/@swimlane\/ngx-datatable\/.*\.css$/,
        use: [
          {
            loader: 'to-string-loader'
          }, {
            loader: 'css-loader',
            options: {
              context: '/'
            }
          }
        ]
      },

      /*
       * to string and css loader support for *.css files
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                context: '/'
              },
            },
          ]
        }),
        exclude: [/node_modules\/@swimlane\/ngx-datatable/]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'css-to-string-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
            context: '/'
          }
        }, {
          loader: 'less-loader',
          options: {
            paths: [
              path.resolve(__dirname, "../node_modules/patternfly/dist/less"),
              path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies"),
              path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies/bootstrap"),
              path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies/font-awesome"),
            ],
            sourceMap: true
          }
        }]
      },

      /**
       * File loader for supporting fonts, for example, in CSS files.
       */
      {
        test: /\.(woff2|woff|ttf|eot|svg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 3000,
            includePaths: [
              path.resolve(__dirname, "../node_modules/patternfly/dist/fonts/")
            ],
            name: 'assets/fonts/[name].[ext]'
          }
        },
        exclude: path.resolve(__dirname, "../src/demo/images/")
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 3000,
            includePaths: [
              path.resolve(__dirname, "../src/demo/images/")
            ],
            name: 'assets/images/[name].[ext]'
          }
        },
        exclude: path.resolve(__dirname, "../node_modules/patternfly/dist/fonts/")
      }
    ]
  },

  output: {
    path: helpers.root('dist-demo'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },
/*
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
*/
  plugins: [
    new AotPlugin({
      entryModule: helpers.root('src/demo/app.module.ts#AppModule'),
      tsConfigPath: helpers.root('tsconfig-aot.json')
    }),

    extractCSS,

    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      template: 'src/demo.html'
    }),

    /**
     * Plugin: NamedModulesPlugin (experimental)
     * Description: Uses file names as module name.
     *
     * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
     */
    new NamedModulesPlugin(),

    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),

    /**
     * Plugin: copy-webpack-plugin
     * Description: Copies individual files or entire directories to the build directory
     *
     * See: https://github.com/kevlened/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: helpers.root('README.md')
    }])
  ]
};
