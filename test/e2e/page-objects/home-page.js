/* Created by tvaleriy on 6/16/16. */
/*eslint-env protractor, jasmine */

'use strict';

const leftCarouselControl = element(by.css('body > gm-app > div > div > undefined > gm-gapminder-overview > ' +
  'section > div.row > div > carousel > div > a.left.carousel-control'));
const rightCarouselControl = element(by.css('body > gm-app > div > div > undefined > gm-gapminder-overview > ' +
  'section > div.row > div > carousel > div > a.left.carousel-control'));

/*const readMore = element(by.css('body > gm-app > div > div > undefined > gm-gapminder-overview > section > div.row' +
  ' > div > carousel > div > div > slide:nth-child(1) > div > div.col-xs-12.col-sm-6.col-md-5 > div > a.more-info'));
const latestBlogPosts = element(by.css('body > gm-app > div > div > undefined > gm-latest-posts > section > h2'));*/
const viewAllPosts = element(by.css('body > gm-app > div > div > undefined > gm-latest-posts > section > div >' +
  ' button'));

/*const latestVideos = element(by.css('body > gm-app > div > div > undefined > gm-latest-videos > section > h2'));
const viewAllVideos = element(by.css('body > gm-app > div > div > undefined > gm-latest-videos > section > div >' +
  ' button'));
const hansTweets = element(by.css('body > gm-app > div > div > undefined > gm-tweets > section > h2'));
const followHans = element(by.css('body > gm-app > div > div > undefined > gm-tweets > section > div > div ' +
  '> div.col-md-3.col-sm-4.text-center > div.text-center > a'));
const leftTweeterCarouselControl = element(by.css('body > gm-app > div > div > undefined > gm-tweets > section > ' +
  'div > div > button.prev > i'));
const rightTweeterCarouselControl = element(by.css('body > gm-app > div > div > undefined > gm-tweets > section > ' +
  'div > div > button.next > i'));
const subscribeToTheNewsletter = element(by.css('#footer > div > div > div > div > h3'));
const subscribe = element(by.css('#footer > div > div > div > form > fieldset > div > input.btn-yellow'));
const enterEmail = element(by.css('#footer > div > div > div > form > fieldset > div > input.text'));*/

const HomePage = {
  clickLeftCarouselControl: () => {
    leftCarouselControl.click();
  },
  clickRightCarouselControl: () => {
    rightCarouselControl.click();
  },
  clickViewAllPosts: () => {
    viewAllPosts.click();
  }
};

module.exports = HomePage;
