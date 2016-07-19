/* Created by tvaleriy on 7/18/16. */
/*eslint-env protractor, jasmine */

'use strict';

const about = element(by.css('#footer > footer > div > div.col-md-7 > div > ul > li:nth-child(1) > a'));
const blog = element(by.css('#footer > footer > div > div.col-md-7 > div > ul > li:nth-child(2) > a'));
const twitter = element(by.css('#footer > footer > div > div.col-md-2 > div > ul > li:nth-child(1) > a > i'));
const facebook = element(by.css('#footer > footer > div > div.col-md-2 > div > ul > li:nth-child(2) > a > i'));
const youTube = element(by.css('#footer > footer > div > div.col-md-2 > div > ul > li:nth-child(3) > a > i'));
const googlePlus = element(by.css('#footer > footer > div > div.col-md-2 > div > ul > li:nth-child(4) > a > i'));
const forTeachers = element(by.css('#footer > footer > div > div.col-md-3 > div > ul > li:nth-child(2) > a'));
const gapminderWorld = element(by.css('#footer > footer > div > div.col-md-3 > div > ul > li:nth-child(1) > a'));

const Footer = {
  clickAbout: () => {
    about.click();
  },
  clickBlog: () => {
    blog.click();
  },
  clickTwitter: () => {
    twitter.click();
  },
  clickFacebook: () => {
    facebook.click();
  },
  clickYouTube: () => {
    youTube.click();
  },
  clickGooglePlus: () => {
    googlePlus.click();
  },
  clickForTeachers: () => {
    forTeachers.click();
  },
  clickGapminderWorld: () => {
    gapminderWorld.click();
  }
};

module.exports = Footer;
