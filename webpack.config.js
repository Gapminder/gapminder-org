/*eslint no-process-env:0, camelcase:0*/
'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = (process.env.NODE_ENV || 'development') === 'production';
const devtool = process.env.NODE_ENV === 'test' ? 'inline-source-map' : 'source-map';
const dest = 'dist';
const absDest = root(dest);
const contentfulConfig = JSON.parse(
  fs.readFileSync('./contentful.json') //eslint-disable-line no-sync
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
    angular2: [
      // Angular 2 Deps
      'zone.js/dist/zone-microtask',
      'reflect-metadata',
      'rxjs',
      'angular2/platform/browser',
      'angular2/common',
      'angular2/core'
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
      /zone\.js\/dist/
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    // static assets
    //new CopyWebpackPlugin([{from: 'demo/favicon.ico', to: 'favicon.ico'}]),
    new CopyWebpackPlugin([{from: 'app/assets', to: 'assets'}]),
    // generating html
    new HtmlWebpackPlugin({template: 'app/index.html'}),
    new webpack.DefinePlugin({
      CONTENTFUL_ACCESS_TOKEN: JSON.stringify(contentfulConfig.accessToken),
      CONTENTFUL_SPACE_ID: JSON.stringify(contentfulConfig.spaceId)
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
