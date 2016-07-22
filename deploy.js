'use strict';

const shell = require('shelljs');
const contenfulDevConfig = require('./contentful-dev.json');
// const contenfulProdConfig = require('./contentful-prod.json');
const contenfulStageConfig = require('./contentful-stage.json');

if (shell.env.TRAVIS_BRANCH === 'master') {
  deploy(contenfulStageConfig);

  //TODO: enable me when hosting is set up
  // deploy(contenfulProdConfig);
} else {
  deploy(contenfulDevConfig);
}

function deploy(contentfulConfig) {
  shell.env.CONTENTFUL_ACCESS_TOKEN = contentfulConfig.accessToken;
  shell.env.CONTENTFUL_SPACE_ID = contentfulConfig.spaceId;
  shell.env.CONTENTFUL_HOST = contentfulConfig.host;
  shell.exec('npm run deploy:$TRAVIS_BRANCH -- --token "$FIREBASE_TOKEN"');
}
