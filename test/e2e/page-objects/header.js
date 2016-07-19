/* Created by tvaleriy on 6/10/16. */
/*eslint-env protractor, jasmine */

'use strict';

const TestMenu = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > div > ' +
  'nav.hidden-xs.hidden-xs-down > ul > li:nth-child(1) > a'));
const Videos = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > div > ' +
  'nav.hidden-xs.hidden-xs-down > ul > li:nth-child(2) > a'));

/*const Facts = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > div > ' +
  'nav.hidden-xs.hidden-xs-down > ul > li:nth-child(3) > a'));
const Answers = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > div > ' +
  'nav.hidden-xs.hidden-xs-down > ul > li:nth-child(3) > ul > li > a'));*/
const Blog = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > div > ' +
  'nav.hidden-xs.hidden-xs-down > ul > li:nth-child(4) > a'));
const NodePage = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > div > ' +
  'nav.hidden-xs.hidden-xs-down > ul > li:nth-child(5) > a'));

/*const Search = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-search > form > ' +
  'fieldset > button > img'));*/

const Header = {
  getPage: () => {
    browser.get('https://gapminder-org-dev.firebaseapp.com/');
  },
  clickTestMenu: () => {
    TestMenu.click();
  },
  clickVideos: () => {
    Videos.click();
  },
  clickBlog: () => {
    Blog.click();
  },
  clickNodePage: () => {
    NodePage.click();
  }
};

module.exports = Header;
