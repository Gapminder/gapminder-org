/*eslint no-process-env:0, camelcase:0*/
'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = (process.env.NODE_ENV || 'development') === 'production';
const devtool = isProduction ? 'cheap-module-eval-source-map' : 'source-map';
const dest = 'dist';
const absDest = root(dest);
const contentfulConfig = JSON.parse(
  fs.readFileSync('./contentful.json') //eslint-disable-line no-sync
);

const twitterConfig = JSON.parse(
  fs.readFileSync('./twitter.json') //eslint-disable-line no-sync
);

const config = {
  devtool,
  debug: false,

  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    cache: false,
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
  },

  entry: {
    common: [
      // Angular 2 Deps + common libs - I split it into separated entries but
      // current version of webpack has problem with that
      // due https://github.com/webpack/webpack/issues/1016
      'zone.js',
      'reflect-metadata',
      'rxjs',
      'angular2/platform/browser',
      'angular2/common',
      'angular2/core',
      'angular2/router',
      // common
      'moment',
      'ng2-bootstrap',
      'ng2-contentful'
    ],
    // vendors: [
    //   // 3rd libs
    //   'moment',
    //   'ng2-bootstrap',
    //   'ng2-contentful'
    // ],
    app: 'app'
  },

  output: {
    path: absDest,
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    loaders: [
      // support markdown
      {test: /\.(png|svg)$/, loader: 'raw'},
      {test: /\.md$/, loader: 'html?minimize=false!markdown'},
      // Support for *.json files.
      {test: /\.json$/, loader: 'json'},
      // Support for CSS as raw text
      {test: /\.styl$/, loader: 'to-string!css?-url!stylus'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw'},
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts',
        query: {
          compilerOptions: {
            removeComments: true,
            noEmitHelpers: false
          }
        },
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/,
      /zone\.js\/dist/,
      /codebird/
    ]
  },

  plugins: [
    // faster without it and now we don't need this
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity
    }),
    // static assets
    //new CopyWebpackPlugin([{from: 'demo/favicon.ico', to: 'favicon.ico'}]),
    new CopyWebpackPlugin([{from: 'app/assets', to: 'assets'}]),
    // generating html
    new HtmlWebpackPlugin({template: 'app/index.html'}),
    new webpack.DefinePlugin({
      CONTENTFUL_ACCESS_TOKEN: JSON.stringify(contentfulConfig.accessToken),
      CONTENTFUL_SPACE_ID: JSON.stringify(contentfulConfig.spaceId),
      TWITTER_CONSUMER_KEY: JSON.stringify(twitterConfig.consumerKey),
      TWITTER_CONSUMER_SECRET: JSON.stringify(twitterConfig.consumerSecret),
      TWITTER_ACCESS_TOKEN_KEY: JSON.stringify(twitterConfig.accessTokenKey),
      TWITTER_ACCESS_TOKEN_SECRET: JSON.stringify(twitterConfig.accessTokenSecret)
    })
  ]
};

function pushPlugins(conf) {
  if (!isProduction) {
    return;
  }

  conf.plugins.push(
    //production only
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: false,
      comments: false,
      compress: {
        screw_ie8: true
        //warnings: false,
        //drop_debugger: false
      }
      //verbose: true,
      //beautify: false,
      //quote_style: 3
    }),
    new CompressionPlugin({
      asset: '{file}.gz',
      algorithm: 'gzip',
      regExp: /\.js$|\.html|\.css|.map$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

pushPlugins(config);

module.exports = config;

function root(location) {
  return path.join(__dirname, location);
}
