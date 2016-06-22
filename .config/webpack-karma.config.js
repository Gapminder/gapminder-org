'use strict';
const path = require('path');
const cwd = process.cwd();
const webpack = require('webpack');

module.exports = {
  resolve: {
    root: [path.resolve(cwd)],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.ts', '.js', '.css']
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts', exclude: [/node_modules\/(?!(ng2-.+))/]},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.styl$/, loader: 'to-string!css?-url!stylus'},
      {test: /\.css$/, loader: 'to-string!css?-url'}
    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: root('../app'),
        loader: 'istanbul-instrumenter',
        exclude: [
          /\.e2e\.ts$/,
          /node_modules/
        ]
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
    new webpack.DefinePlugin({
      TWITTER_CONSUMER_KEY: JSON.stringify('consumerKey'),
      TWITTER_CONSUMER_SECRET: JSON.stringify('consumerSecret'),
      TWITTER_ACCESS_TOKEN_KEY: JSON.stringify('accessTokenKey'),
      TWITTER_ACCESS_TOKEN_SECRET: JSON.stringify('accessTokenSecret')
    })
  ],
  stats: {
    colors: true,
    reasons: true
  },
  watch: false,
  debug: false
};

function root(location) {
  return path.join(__dirname, location);
}
