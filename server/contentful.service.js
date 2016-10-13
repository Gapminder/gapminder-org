'use strict';

const _ = require('lodash');
const contentful = require('contentful');

const contentfulDevConfig = require('./../contentful-dev.json');

const client = contentful.createClient({
  'accessToken': process.env.CONTENTFUL_ACCESS_TOKEN || contentfulDevConfig.accessToken,
  'space': process.env.CONTENTFUL_SPACE_ID || contentfulDevConfig.spaceId,
  'host': process.env.CONTENTFUL_HOST || contentfulDevConfig.host
});

module.exports = {
  findTagBySlug
};

function findTagBySlug(slug, onFound) {
  client
    .getEntries({content_type: 'tag', 'fields.slug': 'blog'})
    .then(tag => onFound(null, _.head(_.get(tag, 'items'))))
    .catch(error => onFound(error));
}