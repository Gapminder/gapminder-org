/* Created by tvaleriy on 6/10/16. */
/*eslint-env protractor, jasmine */

'use strict';

const EC = protractor.ExpectedConditions;
const timeout = 5000;

/*const testMenu = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > ' +
  'div > nav.hidden-xs.hidden-xs-down > ul > li:nth-child(1) > a'));*/
const videos = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > ' +
  'div > nav.hidden-xs.hidden-xs-down > ul > li:nth-child(1) > a'));
const blog = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > ' +
  'div > nav.hidden-xs.hidden-xs-down > ul > li:nth-child(2) > a'));
const facts = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > ' +
  'div > nav.hidden-xs.hidden-xs-down > ul > li:nth-child(3) > a'));
const answers = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > ' +
  'div > nav.hidden-xs.hidden-xs-down > ul > li:nth-child(3) > ul > li > a > img'));

/*
const nodePage = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-header-menu > div > ' +
  'nav.hidden-xs.hidden-xs-down > ul > li:nth-child(5) > a'));
*/

/*const Search = element(by.css('body > gm-app > div > gm-header > header > div > div > div > gm-search > form > ' +
  'fieldset > button > img'));*/

const Header = {
  getPage: () => {
    browser.get('https://gapminder-org-dev.firebaseapp.com/');
  },

  /*  clickTestMenu: () => {
    browser.wait(EC.visibilityOf(testMenu), timeout, 'Page is not loaded');
    testMenu.click();
  },*/
  clickVideos: () => {
    browser.wait(EC.visibilityOf(videos), timeout, 'Page is not loaded');
    videos.click();
  },
  clickBlog: () => {
    browser.wait(EC.visibilityOf(blog), timeout, 'Page is not loaded');
    blog.click();
  },
  clickAnswers: () => {
    browser.wait(EC.visibilityOf(facts), timeout, 'Page is not loaded');
    facts.click();
    browser.wait(EC.visibilityOf(answers), timeout, 'Page is not loaded');
    answers.click();
  }

  /*clickNodePage: () => {
    browser.wait(EC.visibilityOf(nodePage), timeout, 'Page is not loaded');
    nodePage.click();
  }*/
};

module.exports = Header;
