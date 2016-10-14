'use strict';

const _ = require('lodash');
const config = require('./config');
const contentful = require('contentful');

const client = contentful.createClient({
  accessToken: config.CONTENTFUL_ACCESS_TOKEN,
  space: config.CONTENTFUL_SPACE_ID,
  host: config.CONTENTFUL_HOST
});

const cache = new Map();

module.exports = {findTagBySlug};

function findTagBySlug(slug, onFound) {
  if (cache.has(slug)) {
    return onFound(null, cache.get(slug));
  }

  /* eslint-disable */
  return client
    .getEntries({content_type: 'tag', 'fields.slug': slug})
    .then(contentfulTag => {
      const tag = _.head(_.get(contentfulTag, 'items'));

      cache.set(slug, tag);
      onFound(null, tag);
    })
    .catch(error => onFound(error));
  /* eslint-enable */
}
