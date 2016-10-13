'use strict';

module.exports = function createRepository(db) {
  const rssCollection = db.collection('rss');

  function upsertFeedItemByGuid(articleSlug, feedItem, onSaved) {
    return rssCollection.update({guid: articleSlug}, feedItem, {upsert: true}, onSaved);
  }

  function findAllFeedItems(onFound) {
    return rssCollection.find({}).toArray(onFound);
  }

  return {
    upsertFeedItemByGuid,
    findAllFeedItems
  };
};
