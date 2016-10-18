'use strict';

const _ = require('lodash');
const contentfulDevConfig = require('../contentful-local');

/* eslint-disable */
const config = {
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || contentfulDevConfig.accessToken,
  CONTENTFUL_HOST: process.env.CONTENTFUL_HOST || contentfulDevConfig.host,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || contentfulDevConfig.spaceId,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/gapminder_org_local',
  PORT: process.env.PORT || 8081,
  PRERENDER_TOKEN: process.env.PRERENDER_TOKEN,
  CONTENTFUL_WEBHOOK_PASS: process.env.CONTENTFUL_WEBHOOK_PASS,
  CONTENTFUL_WEBHOOK_USER: process.env.CONTENTFUL_WEBHOOK_USER
};

const optionalParams = new Set([
  'MONGO_URL',
  'PORT',
  'CONTENTFUL_SPACE_ID',
  'CONTENTFUL_HOST',
  'CONTENTFUL_ACCESS_TOKEN'
]);

const notProvidedParams = _.pickBy(config, (value, param) => !optionalParams.has(param) && !value);

if (!_.isEmpty(notProvidedParams) && process.env.NODE_ENV !== 'local') {
  throw Error(`Following params were not provided: ${_.keys(notProvidedParams)}`);
}
/* eslint-enable */

module.exports = config;
