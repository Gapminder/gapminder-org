#!/usr/bin/env node

'use strict';

var path = require('path');
var fs = require('fs');
var BrowserStackTunnel = require('browserstacktunnel-wrapper');
var cwd = path.dirname(require.main.filename);

var confDir = path.dirname(cwd);
var liteServerConfFilename = path.join(confDir, 'bs-config.json');

var TUNNEL_IDENTIFIER = process.env.TRAVIS_BUILD_NUMBER;
var READY_FILE = path.join(' ', 'tmp', 'bstack-' + TUNNEL_IDENTIFIER + '.ready').trim();
var ACCESS_KEY = process.env.BROWSER_STACK_ACCESS_KEY;
var HOST = 'localhost';
var PORT = JSON.parse(fs.readFileSync(liteServerConfFilename)).port;

console.log('Starting tunnel on port', PORT);

var tunnel = new BrowserStackTunnel({
  key: ACCESS_KEY,
  localidentifier: TUNNEL_IDENTIFIER,
  hosts: [{name: HOST,
    port: PORT,
    sslFlag: 0}],
  linux64Bin: cwd
});

tunnel.start(function(error) {
  if (error) {
    console.error('Can not establish the tunnel', error);
  } else {
    console.log('Tunnel established.');

    if (READY_FILE) {
      fs.writeFile(READY_FILE, '');
    }
  }
});
