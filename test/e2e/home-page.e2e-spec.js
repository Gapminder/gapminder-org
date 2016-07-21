/* Created by tvaleriy on 7/18/16. */
/*eslint-env protractor, jasmine */

'use strict';
const HomePage = require('/home/tvaleriy/work/gapminder-org/test/e2e/page-objects/home-page.js');
const Header = require('/home/tvaleriy/work/gapminder-org/test/e2e/page-objects/header.js');

describe('Home Page elements interaction', () => {
  beforeEach(() => {
    Header.getPage();
  });
  it('Should open Blog page', () => {
    HomePage.clickViewAllPosts();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/blog');
  });
  it('Should open Videos page', () => {
    HomePage.clickViewAllVideos();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/videos');
  });
});
