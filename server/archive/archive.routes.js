'use strict';

const http = require('http');

/* eslint-disable */
module.exports = app => {
  app.get('/check-url', (req, res) => {
    const options = {
      method: 'HEAD',
      host: 'archive.gapminder.org',
      path: `/${req.query.url}/`
    };
    const checkPath = http.request(options, resp => {
      res.json({statusCode: resp.statusCode});
    });

    checkPath.end();
  });
};
/* eslint-enable */
