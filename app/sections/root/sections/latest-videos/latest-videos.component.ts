import { Component, Input, OnInit } from '@angular/core';
import { ContenfulContent, ContentfulNodePage, ToDatePipe, RoutesManagerService } from 'ng2-contentful-blog';
import { ROUTER_DIRECTIVES } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'gm-latest-videos',
  template: require('./latest-videos.html') as string,
  styles: [require('./latest-videos.styl') as string],
  directives: [ROUTER_DIRECTIVES],
  pipes: [ToDatePipe]
})
export class LatestVideosComponent implements OnInit {
  @Input()
  private limit: number = 3;
  private videos: ContentfulNodePage[];
  private contentfulContentService: ContenfulContent;
  private routesManager: RoutesManagerService;
  private parentSlug: string = 'videos';
  private parentName: string = 'Videos';
  private tagId: string;
  private nameTag: string = 'video';

  public constructor(contentfulContentService: ContenfulContent, routesManager: RoutesManagerService) {
    this.contentfulContentService = contentfulContentService;
    this.routesManager = routesManager;
  }

  public ngOnInit(): void {
    this.routesManager.addRoute({path: this.parentSlug, data: {name: this.parentName}});
    this.contentfulContentService
      .getTagsBySlug(this.nameTag).subscribe((tags: any[]) => {
      if (!_.isEmpty(tags)) {
        this.tagId = tags[0].sys.id;
        this.contentfulContentService
          .getLatestArticlesByTag(this.tagId, this.limit)
          .subscribe(
            (videos: ContentfulNodePage[]) => {
              this.videos = videos;
              for (let video of this.videos) {
                this.contentfulContentService.getArticleParentSlug(video.sys.id, (url: string) => {
                  video.fields.url = this.routesManager.addRoute({path: url, data: {name: video.fields.title}});
                });
              }
            });
      }
    });
  }
}
