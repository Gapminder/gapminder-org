import { Component, OnInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { Angulartics2On } from 'angulartics2';
import {
  ToDatePipe,
  ContentfulNodePage,
  ContenfulContent,
  RoutesManagerService
} from 'ng2-contentful-blog';
import * as _ from 'lodash';

@Component({
  selector: 'gm-latest-posts',
  template: require('./latest-posts.html') as string,
  styles: [require('./latest-posts.styl') as string],
  directives: [ROUTER_DIRECTIVES, Angulartics2On],
  pipes: [AsyncPipe, ToDatePipe]
})
export class LatestPostsComponent implements OnInit {
  @Input()
  private limit: number = 3;
  private posts: ContentfulNodePage[];
  private contentfulContentService: ContenfulContent;
  private parentSlug: string = 'blog';
  private parentName: string = 'Blog';
  private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics;
  private tagId: string;
  private routesManager: RoutesManagerService;

  public constructor(contentfulContentService: ContenfulContent,
                     routesManager: RoutesManagerService,
                     angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    this.contentfulContentService = contentfulContentService;
    this.angulartics2GoogleAnalytics = angulartics2GoogleAnalytics;
    this.routesManager = routesManager;

  }

  public ngOnInit(): any {
    this.routesManager.addRoute(this.parentSlug, {name: this.parentName});
    this.contentfulContentService
      .getTagsBySlug('blog').subscribe((tags: any[]) => {
      if (!_.isEmpty(tags)) {
        this.tagId = tags[0].sys.id;
        this.contentfulContentService
          .getLatestArticlesByTag(this.tagId, this.limit)
          .subscribe(
            (posts: ContentfulNodePage[]) => {
              this.posts = posts;
              for (let post of posts) {
                this.contentfulContentService.getArticleParentSlug(post.sys.id, (url: string) => {
                  post.fields.url = this.routesManager.addRoute(url, {name: post.fields.title});
                });
              }
            });
      }
    });
  }
}
