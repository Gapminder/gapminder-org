'use strict';

let config = {
  baseUrl: 'http://localhost:3000/',
  specs: [
    '../app/*.e2e.ts'
  ],
  exclude: [],

  framework: 'jasmine',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 400000,
    print: function () {
    }
  },

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  },

  reporter: ['spec'],
  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true
};

if (process.env.TRAVIS) {
  config.multiCapabilities = [
    {
      'browserName': 'chrome',
      'version': '46',
      'browserstack.user': process.env.BROWSER_STACK_USERNAME,
      'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'browserstack.debug': 'true',
      'tunnel-identifier': process.env.TRAVIS_BUILD_NUMBER,
      'browserstack.local': 'true'
    }
  ];
  config.seleniumAddress = 'http://hub.browserstack.com/wd/hub';
}

exports.config = config;
