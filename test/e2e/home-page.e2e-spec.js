/* Created by tvaleriy on 7/18/16. */
/*eslint-env protractor, jasmine */

'use strict';
const timeout = 10000;
const HomePage = require('/test/e2e/page-objects/home-page.js');
const Header = require('/test/e2e/page-objects/header.js');
const EC = protractor.ExpectedConditions;

describe('Home Page elements interaction', () => {
  beforeEach(() => {
    Header.getPage();
  });
  it('Should open Blog page', () => {
    browser.wait(EC.visibilityOf(HomePage.viewAllPosts), timeout, 'Page is not loaded');
    HomePage.clickViewAllPosts();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/blog');
  });
});
