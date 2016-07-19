/* Created by tvaleriy on 6/14/16. */
/*eslint-env protractor, jasmine */

'use strict';
const timeout = 10000;
const Header = require('/test/e2e/page-objects/header.js');
const EC = protractor.ExpectedConditions;

describe('Header menu items', () => {
  beforeEach(() => {
    Header.getPage();
  });
  it('should open test menu', () => {
    browser.wait(EC.visibilityOf(Header.TestMenu), timeout, 'Page is not loaded');
    Header.clickTestMenu();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/test-nodepage-for-new-menu');
  });
  it('should open videos menu', () => {
    browser.wait(EC.visibilityOf(Header.Videos), timeout, 'Page is not loaded');
    Header.clickVideos();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/videos');
  });
  it('should open blog menu', () => {
    browser.wait(EC.visibilityOf(Header.Blog), timeout, 'Page is not loaded');
    Header.clickBlog();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/blog');
  });
  it('should open nodepage menu', () => {
    browser.wait(EC.visibilityOf(Header.NodePage), timeout, 'Page is not loaded');
    Header.clickNodePage();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/test-page-for-check-using-' +
      'fields');
  });
});

