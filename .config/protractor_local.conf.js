/**
 * Created by tvaleriy on 6/7/16.
 */

'use strict';

exports.config = {
  directConnect: true,
  chromeDriver: '/usr/lib/node_modules/webdriver-manager/selenium/chromedriver_2.22',
  noGlobals: false,
  specs: [
    '../test/e2e/*-spec.js'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['show-fps-counter=true']
    }
  },
  baseUrl: 'https://gapminder-org-dev.firebaseapp.com/',
  useAllAngular2AppRoots: true,
  /*rootElement: 'body',*/
  allScriptsTimeout: 5000000,
  getPageTimeout: 10000,
  restartBrowserBetweenTests: false,
  untrackOutstandingTimeouts: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: () => {
    browser.driver.get(browser.baseUrl);
    browser.ignoreSynchronization = true;
    const SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
};
