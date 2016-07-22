/*eslint no-process-env:0, camelcase:0*/
'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = (process.env.NODE_ENV || 'development') === 'production';
const isLocal = process.env.NODE_ENV === 'local';
const devtool = isProduction ? 'cheap-module-eval-source-map' : 'source-map';
const dest = 'dist';
const absDest = root(dest);

const contentfulDevConfig = JSON.parse(
  fs.readFileSync('./contentful-dev.json') // eslint-disable-line no-sync
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
      'es6-shim',
      'es6-promise',
      'zone.js',
      'es7-reflect-metadata',
      'rxjs',
      '@angular/common',
      '@angular/core',
      '@angular/http',
      '@angular/compiler',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router-deprecated',
      'moment',
      'ng2-bootstrap',
      'ng2-contentful-blog',
      'ng2-contentful'
    ],
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
      {test: /\.(png|svg)$/, loader: 'raw'},
      {test: /\.md$/, loader: 'html?minimize=false!markdown'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'to-string!css?-url'},
      {test: /\.styl$/, loader: 'to-string!css?-url!stylus'},
      {test: /\.html$/, loader: 'raw'},
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
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([{from: 'app/assets', to: 'assets'}]),
    new HtmlWebpackPlugin({
      template: 'app/index.html.template',
      googleAnalytics: {
        trackingId: isProduction ? 'UA-67908993-3' : 'UA-XXXXX-Y',
        pageViewOnLoad: false
      }
    }),
    new webpack.DefinePlugin({
      CONTENTFUL_ACCESS_TOKEN:
        JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN) || JSON.stringify(contentfulDevConfig.accessToken),
      CONTENTFUL_SPACE_ID:
        JSON.stringify(process.env.CONTENTFUL_SPACE_ID) || JSON.stringify(contentfulDevConfig.spaceId),
      CONTENTFUL_HOST:
        JSON.stringify(process.env.CONTENTFUL_HOST) || JSON.stringify(contentfulDevConfig.host),
      TWITTER_CONSUMER_KEY: JSON.stringify(twitterConfig.consumerKey),
      TWITTER_CONSUMER_SECRET: JSON.stringify(twitterConfig.consumerSecret),
      TWITTER_ACCESS_TOKEN_KEY: JSON.stringify(twitterConfig.accessTokenKey),
      TWITTER_ACCESS_TOKEN_SECRET: JSON.stringify(twitterConfig.accessTokenSecret)
    })
  ]
};

function pushPlugins(conf) {
  if (isLocal) {
    return;
  }

  conf.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: false,
      comments: false,
      compress: {
        screw_ie8: true
      }
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
