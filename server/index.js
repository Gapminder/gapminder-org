'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;

const config = require('./config');

const app = express();

const ROOT = path.resolve(__dirname, '../dist');

/* eslint-disable */
MongoClient.connect(config.MONGO_URL, (error, db) => {
  if (error) {
    throw error;
  }

  app.use(require('prerender-node').set('prerenderToken', config.PRERENDER_TOKEN));
  app.use(bodyParser.json({type: 'application/*'}));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(ROOT));
  app.set('gp.mongodb', db);
  require('./rss/rss.routes.js')(app);
  require('./archive/archive.routes.js')(app);

  app.get('/robots.txt', (req, res) => res.sendStatus(404));
  app.get('*', (req, res) => res.sendFile(path.resolve(ROOT, 'index.html')));

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.listen(config.PORT, () => console.log(`Prerender is up and running on port ${config.PORT}`));
});
/* eslint-enable */
