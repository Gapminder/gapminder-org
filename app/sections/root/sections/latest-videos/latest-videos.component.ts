import { Component, Input, OnInit, Inject } from '@angular/core';
import { RouterLink } from '@angular/router-deprecated';
import { ContenfulContent, ContentfulNodePage, ToDatePipe, RoutesGatewayService } from 'ng2-contentful-blog';
import { Angulartics2On } from 'angulartics2/index';

@Component({
  selector: 'gm-latest-videos',
  template: require('./latest-videos.html') as string,
  styles: [require('./latest-videos.styl') as string],
  directives: [RouterLink, Angulartics2On],
  pipes: [ToDatePipe]
})
export class LatestVideosComponent implements OnInit {
  @Input()
  private limit: number = 3;
  private videos: ContentfulNodePage[];
  private contentfulContentService: ContenfulContent;
  private routesGatewayService: RoutesGatewayService;
  private parentSlug: string = 'videos';
  private parentName: string = 'Videos';
  private tagId: string;
  private nameTag: string = 'video';

  public constructor(@Inject(ContenfulContent) contentfulContentService: ContenfulContent,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService) {
    this.contentfulContentService = contentfulContentService;
    this.routesGatewayService = routesGatewayService;

  }

  public ngOnInit(): void {
    this.routesGatewayService.addRoute(this.parentSlug, {name: this.parentName});
    this.contentfulContentService
      .getTagsBySlug(this.nameTag).subscribe((contentTag: any[]) => {
      this.tagId = contentTag[0].sys.id;
      this.contentfulContentService
        .getLatestArticlesByTag(this.tagId, this.limit)
        .subscribe(
          (res: ContentfulNodePage[]) => {
            this.videos = res;
            for (let item of this.videos) {
              this.routesGatewayService.getArticleParentSlug(item.sys.id, (url: string) => {
                item.fields.url = this.routesGatewayService.addRoute(url, {name: item.fields.title});
              });
            }
          });
    });
  }
}
