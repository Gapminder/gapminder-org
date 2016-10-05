'use strict';

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ROOT = path.join(__dirname, 'dist');

const app = express();
const rss = require('rss');

const Datastore = require('nedb');
const db = new Datastore({filename: path.join(__dirname, '/db'), autoload: true});

const contentfulDevConfig = require('./contentful-dev.json');
const contentful = require('contentful');

// prerender
/*eslint-disable*/
const client = contentful.createClient({
  'accessToken': process.env.CONTENTFUL_ACCESS_TOKEN || contentfulDevConfig.accessToken,
  'space': process.env.CONTENTFUL_SPACE_ID || contentfulDevConfig.spaceId,
  'host': process.env.CONTENTFUL_HOST || contentfulDevConfig.host
});

if (!process.env.PRERENDER_TOKEN) {
  console.error('Error: PRERENDER_TOKEN was not provided');
}
app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));
/*eslint-enable*/

app.use(bodyParser.json({type: 'application/*'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(ROOT));

/*eslint-disable*/
const feed = new rss({
  title: 'Gapminder RSS Feed',
  description: 'Gapminder.org RSS Feed',
  author: 'Gapminder.org',
  feed_url: 'https://www.gapminder.org/',
  site_url: 'https://www.gapminder.org/',
  image_url: 'http://www.gapminder.org/public/logo.png'
});
/*eslint-enable*/
/*eslint-disable*/
app.post('/rss', (req, res) => {
  feed.feed_url = `https://${req.headers.host}`;
  feed.site_url = `https://${req.headers.host}`;

  const fields = req.body.fields;

  const itemTemplate = {
    title: fields.title['en-US'],
    description: fields.description ? fields.description['en-US'] : '',
    url: `https://${req.headers.host}/${fields.slug['en-US']}`,
    guid: fields.slug['en-US'],
    categories: [],
    author: 'gapminder',
    date: fields.createdAt,
    enclosure: false,
    custom_elements: []
  };

  if (req.body.sys.contentType.sys.id === 'article') {
    client.getEntries({content_type: 'tag'})
      .then(entries => {
        const getTagBlog = _.find(entries.items, {fields: {slug: 'blog'}});
        const isTagsInFields = _.get(fields, 'tags[\'en-US\']', false);
        const findTag = isTagsInFields ? _.find(fields.tags['en-US'], {sys: {id: getTagBlog.sys.id}}) : '';
        if (!_.isEmpty(getTagBlog) && !_.isEmpty(findTag)) {
          findItem(fields.slug['en-US'], itemTemplate);
          res.status(200).json({message: 'ok got it!'});
        }
      });
  }
});

function findItem(slug, itemTemplate) {
  db.findOne({guid: slug}, (err, item) => {
    if (!_.isEmpty(item)) {
      remove(item);
      dbInsert(itemTemplate);
    } else {
      dbInsert(itemTemplate);
    }
  });
}

function remove(item) {
  db.remove(item, {}, err => {
    if (err) {
      console.error('Error: ', err);
    }
  });
}

function dbInsert(itemTemplate) {
  db.insert(itemTemplate, err => {
    if (err) {
      console.error('Error: ', err);
    }
  });
}

app.get('/feed/rss', (req, res) => {
  res.type('rss');
  res.set('Content-Type', 'text/xml');
  feed.items = [];
  db.find({}, (err, items) => {
    if (err) {
      console.error('Error: ', err);
    }
    if (!_.isEmpty(items)) {
      items.forEach(product => {
        feed.item(product);
      });
    }
    res.send(feed.xml());
  });
});
/*eslint-enable*/

app.get('*', (req, res) => res.sendFile(path.resolve(ROOT, 'index.html')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});
/*eslint-disable*/
const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Prerender is up and running on port ${port}`));
/*eslint-enable*/
