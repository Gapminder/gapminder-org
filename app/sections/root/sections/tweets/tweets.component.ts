import { Component, Input, OnInit } from '@angular/core';
import { TwitterService, Tweet, TwitterRequest } from '../../../../shared/services/twitter.service';
import * as _ from 'lodash';

@Component({
  selector: 'gm-tweets',
  template: require('./tweets.html') as string,
  styles: [require('./tweets.styl') as string]
})
export class TweetsComponent implements OnInit {
  private static NEXT_TWEETS: string = 'next';
  private static PREVIOUS_TWEETS: string = 'previous';

  @Input()
  private author: string;

  /* tslint:disable:no-unused-variable */
  private infFollow: FollowerInfo = {
    link: 'https://twitter.com/hansrosling',
    title: 'Follow Hans',
    count: 'Followers'
  };
  /* tslint:enable:no-unused-variable */

  private tweets: Array<Tweet> = [];
  private currentTweet: Tweet;
  private disabled: boolean = false;
  private count: string;
  private twitter: TwitterService;

  public constructor(twitter: TwitterService) {
    this.twitter = twitter;
  }

  public ngOnInit(): void {
    this.consumeTweets();
  }

  public nextTweet(): void {
    const foundTweet: Tweet = _.findLast(this.tweets, (tweet: Tweet) => tweet.id > this.currentTweet.id);
    this.consumeTweets(TweetsComponent.NEXT_TWEETS, foundTweet);
  }

  public previousTweet(): void {
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
        (error: any) => console.error(error),
        () => this.disabled = false
      );
  }

  private processTweets(tweets: Tweet[]): void {
    this.currentTweet = _.head(this.sortTweets(tweets)) || this.currentTweet;
    this.count = this.formatTwitterFollowersAmount(this.currentTweet.user.followers_count);
    this.tweets = this.sortTweets(this.tweets ? this.tweets.concat(tweets) : tweets);
  }

  private sortTweets(tweets: Array<Tweet>): Array<Tweet> {
    return _.orderBy(tweets, ['id'], ['desc']);
  }

  private formatTwitterFollowersAmount(amount: number): string {
    if (amount > 1000) {
      return (Math.round((amount / 1000) * 10) / 10) + 'K';
    }
    return String(amount);
  }

}

interface FollowerInfo {
  link: string;
  title: string;
  count: string;
}
