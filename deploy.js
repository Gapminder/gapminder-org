'use strict';

const shell = require('shelljs');
const contenfulDevConfig = require('./contentful-dev.json');
// const contenfulProdConfig = require('./contentful-prod.json');
const contenfulStageConfig = require('./contentful-stage.json');
const contenfulTestingConfig = require('./contentful-testing.json');

if (shell.env.TRAVIS_BRANCH === 'master') {
  deploy(shell.env.TRAVIS_BRANCH, contenfulStageConfig);

  //TODO: enable me when hosting is set up
  // deploy(contenfulProdConfig);
} else if (shell.env.TRAVIS_BRANCH === 'development') {
  deploy(shell.env.TRAVIS_BRANCH, contenfulDevConfig);
  deploy('testing', contenfulTestingConfig);
}

function deploy(env, contentfulConfig) {
  shell.env.CONTENTFUL_ACCESS_TOKEN = contentfulConfig.accessToken;
  shell.env.CONTENTFUL_SPACE_ID = contentfulConfig.spaceId;
  shell.env.CONTENTFUL_HOST = contentfulConfig.host;

  shell.exec(`npm run deploy:${env} -- --token "$FIREBASE_TOKEN"`);
}
