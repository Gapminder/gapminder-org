import {Component, OnInit, Input} from 'angular2/core';
import {DatePipe, AsyncPipe} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../../../shared/services/contentful-content.service';
import {ContentfulNodePage} from '../../../../shared/structures/aliases.structures';

@Component({
  selector: 'latest-posts',
  template: <string> require('./latest-posts.html'),
  styles: [<string> require('./latest-posts.styl')],
  pipes: [DatePipe, AsyncPipe]
})
export class LatestPostsComponent implements OnInit {
  @Input()
  private limit: number = 3;

  private posts: Observable<ContentfulNodePage[]>;

  constructor(private _contentfulContent: ContenfulContent) {
  }

  private toDate(dateAsString): Date {
    return new Date(dateAsString);
  }

  ngOnInit(): any {
    this.posts = this._contentfulContent.getLatestPosts(this.limit);
  }
}
