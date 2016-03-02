#!/usr/bin/env node

'use strict';

var path = require('path');
var fs = require('fs');

var iterNum = process.env.TRAVIS_BUILD_NUMBER;
var max_tries = 30;
var file = path.join(' ', 'tmp', 'bstack-' + iterNum + '.ready').trim();

function checkFile() {
  return fs.existsSync(file);
}

function recurcive_wait(counter, checker) {
  if (counter > 0) {
    if (!checker()) {
      setTimeout(function() {
        recurcive_wait(counter - 1, checker);
      }, 1000);
    } else {
      console.log('wait4tunnel: ok');
      process.exit(0);
    }
  } else {
    console.log('Seems like bstack tunnel is not established. Timed out. Exiting.');
    process.exit(1);
  }
}

recurcive_wait(max_tries, checkFile);
