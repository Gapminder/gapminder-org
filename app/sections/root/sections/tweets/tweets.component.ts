import {Component, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TwitterService, Tweet, TwitterRequest} from '../../../../shared/services/twitter.service';
import * as _ from 'lodash';
import {ToDate} from '../../../../shared/pipes/to-date.pipe';

@Component({
  selector: 'tweets',
  template: <string> require('./tweets.html'),
  styles: [
    <string> require('./tweets.styl')
  ],
  directives: [...CORE_DIRECTIVES],
  pipes: [ToDate]
})
export class TweetsComponent implements OnInit {
  private static NEXT_TWEETS: string = 'next';
  private static PREVIOUS_TWEETS: string = 'previous';

  @Input()
  private author: string;

  private infFollow: FollowerInfo = {
    link: 'https://twitter.com/hansrosling',
    title: 'Follow Hans',
    count: 'Followers'
  };

  private tweets: Array<Tweet> = [];
  private currentTweet: Tweet;
  private disabled: boolean = false;

  constructor(private twitter: TwitterService) {
  }

  ngOnInit(): any {
    this.consumeTweets();
  }

  nextTweet(): void {
    const foundTweet: Tweet = _.findLast(this.tweets, (tweet: Tweet) => tweet.id > this.currentTweet.id);
    this.consumeTweets(TweetsComponent.NEXT_TWEETS, foundTweet);
  }

  previousTweet(): void {
    const foundTweet: Tweet = _.find(this.tweets, (tweet: Tweet) => tweet.id < this.currentTweet.id);
    this.consumeTweets(TweetsComponent.PREVIOUS_TWEETS, foundTweet);
  }

  private consumeTweets(direction?: string, foundTweet?: Tweet): void {
    if (foundTweet) {
      this.currentTweet = foundTweet;
      return;
    }
    this.disabled = true;

    let request: TwitterRequest =
      this.twitter
        .create()
        .author(this.author);

    if (direction === TweetsComponent.NEXT_TWEETS) {
      request = request.sinceId(this.currentTweet.id_str);
    } else if (direction === TweetsComponent.PREVIOUS_TWEETS) {
      request = request.maxId(this.currentTweet.id_str);
    }

    request
      .getTweets()
      .subscribe(
        this.processTweets.bind(this),
        error => console.error(error),
        () => this.disabled = false
      );
  }

  private processTweets(tweets): void {
    this.currentTweet = _.head(TweetsComponent.sortTweets(tweets)) || this.currentTweet;
    this.tweets = TweetsComponent.sortTweets(this.tweets ? this.tweets.concat(tweets) : tweets);
  }

  private static sortTweets(tweets: Array<Tweet>): Array<Tweet> {
    return _.orderBy(tweets, ['id'], ['desc']);
  }
}

interface FollowerInfo {
  link: string;
  title: string;
  count: string;
}
