'use strict';

const basicAuth = require('basic-auth');

const config = require('./config');

module.exports = {auth};

const ACCESS_UNAUTHORIZED = 401;

function auth(req, res, next) {
  function unauthorized(response) {
    response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return response.sendStatus(ACCESS_UNAUTHORIZED);
  }

  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === config.CONTENTFUL_WEBHOOK_USER && user.pass === config.CONTENTFUL_WEBHOOK_PASS) {
    return next();
  }

  return unauthorized(res);
}

