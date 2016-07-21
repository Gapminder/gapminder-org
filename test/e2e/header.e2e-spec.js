/* Created by tvaleriy on 6/14/16. */
/*eslint-env protractor, jasmine */

'use strict';

const Header = require('/home/tvaleriy/work/gapminder-org/test/e2e/page-objects/header.js');

describe('Header menu items', () => {
  beforeEach(() => {
    Header.getPage();
  });

  /*  it('should open test menu', () => {
    Header.clickTestMenu();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/test-nodepage-for-new-menu');
  });*/
  it('should open videos page from header', () => {
    Header.clickVideos();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/videos');
  });
  it('should open blog page from header', () => {
    Header.clickBlog();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/blog');
  });
  it('should open answers page from header', () => {
    Header.clickAnswers();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/answers');
  });

  /*  it('should open nodepage menu', () => {
    Header.clickNodePage();
    expect(browser.getCurrentUrl()).toEqual('https://gapminder-org-dev.firebaseapp.com/#/test-page-for-check-using-' +
      'fields');
  });*/
});

