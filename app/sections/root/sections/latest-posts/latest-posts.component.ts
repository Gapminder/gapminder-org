import {Component, OnInit, Input} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {AsyncPipe} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../../../shared/services/contentful-content.service';
import {ContentfulNodePage} from '../../../../shared/structures/aliases.structures';
import {ToDate} from '../../../../shared/pipes/to-date.pipe';

@Component({
  selector: 'latest-posts',
  template: <string> require('./latest-posts.html'),
  styles: [<string> require('./latest-posts.styl')],
  directives: [RouterLink],
  pipes: [AsyncPipe, ToDate]
})
export class LatestPostsComponent implements OnInit {
  @Input()
  private limit: number = 3;
  private posts: Observable<ContentfulNodePage[]>;

  constructor(private _contentfulContent: ContenfulContent) {
  }

  ngOnInit(): any {
    this.posts = this._contentfulContent.getLatestPosts(this.limit);
  }
}
