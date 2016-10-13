'use strict';

const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const ROOT = path.resolve(__dirname, '../dist');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/gapminder_org_local';

MongoClient.connect(MONGO_URL, (error, db) => {
  if (error) {
    throw error;
  }

  app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));
  app.use(bodyParser.json({type: 'application/*'}));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(ROOT));

  app.set('gp.mongodb', db);

  require('./rss/rss.routes.js')(app);

  app.get('*', (req, res) => res.sendFile(path.resolve(ROOT, 'index.html')));
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  const port = process.env.PORT || 8081;
  app.listen(port, () => console.log(`Prerender is up and running on port ${port}`));
});
