/* Created by tvaleriy on 7/18/16. */
/*eslint-env protractor, jasmine */

'use strict';

const EC = protractor.ExpectedConditions;
const timeout = 5000;
const about = element(by.css('#footer > footer > div > div.col-md-7 > gm-footer-menu > ul > li:nth-child(1) > a'));
const blog = element(by.css('#footer > footer > div > div.col-md-7 > gm-footer-menu > ul > li:nth-child(2) > a'));
const twitter = element(by.css('#footer > footer > div > div.col-md-2 > div > ul > li:nth-child(1) > a > i'));
const facebook = element(by.css('#footer > footer > div > div.col-md-2 > div > ul > li:nth-child(2) > a > i'));
const youTube = element(by.css('#footer > footer > div > div.col-md-2 > div > ul > li:nth-child(3) > a > i'));
const googlePlus = element(by.css('#footer > footer > div > div.col-md-2 > div > ul > li:nth-child(4) > a > i'));
const forTeachers = element(by.css('#footer > footer > div > div.col-md-3 > div > ul > li:nth-child(2) > a'));
const gapminderWorld = element(by.css('#footer > footer > div > div.col-md-3 > div > ul > li:nth-child(1) > a'));

const Footer = {
  clickAbout: () => {
    browser.wait(EC.visibilityOf(about), timeout, 'Page is not loaded');
    about.click();
  },
  clickBlog: () => {
    browser.wait(EC.visibilityOf(blog), timeout, 'Page is not loaded');
    blog.click();
  },
  clickTwitter: () => {
    browser.wait(EC.visibilityOf(twitter), timeout, 'Page is not loaded');
    twitter.click();
  },
  clickFacebook: () => {
    browser.wait(EC.visibilityOf(facebook), timeout, 'Page is not loaded');
    facebook.click();
  },
  clickYouTube: () => {
    browser.wait(EC.visibilityOf(youTube), timeout, 'Page is not loaded');
    youTube.click();
  },
  clickGooglePlus: () => {
    browser.wait(EC.visibilityOf(googlePlus), timeout, 'Page is not loaded');
    googlePlus.click();
  },
  clickForTeachers: () => {
    browser.wait(EC.visibilityOf(forTeachers), timeout, 'Page is not loaded');
    forTeachers.click();
  },
  clickGapminderWorld: () => {
    browser.wait(EC.visibilityOf(gapminderWorld), timeout, 'Page is not loaded');
    gapminderWorld.click();
  }
};

module.exports = Footer;
