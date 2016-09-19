'use strict';

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const ROOT = path.join(__dirname, 'dist');

const app = express();

// prerender
/*eslint-disable*/
if (!process.env.PRERENDER_TOKEN) {
  console.error('Error: PRERENDER_TOKEN was not provided');
}
app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));
/*eslint-enable*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(ROOT));

app.use('*', (req, res) => res.sendFile(path.resolve(ROOT, 'index.html')));

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
