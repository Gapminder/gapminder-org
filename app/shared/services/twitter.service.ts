import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {bindCallback} from 'rxjs/observable/bindCallback';
import 'rxjs/add/operator/map';

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
  public create(): TwitterRequest {
    return new TwitterRequest();
  }
}

export class TwitterRequest {
  private params: any = {};

  public author(name: string): TwitterRequest {
    this.params.screen_name = name;
    return this;
  }

  public maxId(maxId: string): TwitterRequest {
    if (maxId) {
      this.params.max_id = maxId;
    }
    return this;
  }

  public sinceId(sinceId: string): TwitterRequest {
    if (sinceId) {
      this.params.since_id = sinceId;
    }
    return this;
  }

  public count(count: number): TwitterRequest {
    this.params.count = count || 10;
    return this;
  }

  public getTweets(): Observable<Array<Tweet>> {
    const tweetsWrapper: (author: string, params: any) => Observable<any> = bindCallback(cb.__call.bind(cb));
    return tweetsWrapper('statuses_userTimeline', this.params)
      .map((response: any) => _.head(response));
  }
}

export interface Tweet {
  id: number;
  id_str: string;
  text: string;
  created_at: string;
  user: TwitterUser;
}

export interface TwitterUser {
  url: string;
  name: string;
  profile_image_url: string;
  followers_count: number;
}

