import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

declare const TWITTER_CONSUMER_KEY: string;
declare const TWITTER_CONSUMER_SECRET: string;
declare const TWITTER_ACCESS_TOKEN_KEY: string;
declare const TWITTER_ACCESS_TOKEN_SECRET: string;

const Codebird = require('codebird');
const cb = new Codebird();
cb.setConsumerKey(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);
cb.setToken(TWITTER_ACCESS_TOKEN_KEY, TWITTER_ACCESS_TOKEN_SECRET);

@Injectable()
export class TwitterService {
  create(): TwitterRequest {
    return new TwitterRequest();
  }
}

export class TwitterRequest {
  private params:any = {};

  author(name: string): TwitterRequest {
    this.params.screen_name = name;
    return this;
  }

  maxId(maxId: string): TwitterRequest {
    if (maxId) {
      this.params.max_id = maxId;
    }
    return this;
  }

  sinceId(sinceId: string): TwitterRequest {
    if (sinceId) {
      this.params.since_id = sinceId;
    }
    return this;
  }

  count(count: number): TwitterRequest {
    this.params.count = count || 10;
    return this;
  }

  getTweets(): Observable<Array<Tweet>> {
    const tweetsWrapper: (string, any) => Observable<any> = Observable.bindCallback(cb.__call.bind(cb));
    return tweetsWrapper('statuses_userTimeline', this.params)
      .map((response:any) => _.head(response));
  }
}

export interface Tweet {
  id: number;
  id_str: string;
  text: string;
  created_at: string;
  user: TwitterUser;
}

export class TwitterUser {
  url: string;
  name: string;
  profile_image_url: string;
  followers_count: number;
}

