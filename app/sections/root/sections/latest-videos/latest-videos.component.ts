import {Component, Input, OnInit, Inject} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../../../shared/services/contentful-content.service';
import {ContentfulNodePage} from '../../../../shared/structures/aliases.structures';
import {ToDatePipe} from '../../../../shared/pipes/to-date.pipe';
import {RoutesGatewayService} from '../../../../shared/services/routes-gateway.service';
import {Angulartics2On} from 'angulartics2/index';

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

  public constructor(@Inject(ContenfulContent) contentfulContentService: ContenfulContent,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService) {
    this.contentfulContentService = contentfulContentService;
    this.routesGatewayService = routesGatewayService;

  }

  public ngOnInit(): void {
    this.routesGatewayService.addRoute(this.parentSlug, {name: this.parentName});
    this.contentfulContentService.getLatestVideo(this.limit)
      .subscribe((videos: ContentfulNodePage[]) => {
        for (let video of videos) {
          this.routesGatewayService.getSlugParent(video.sys.id, (url: string) => {
            video.fields.url = this.routesGatewayService.addRoute(url, {name: video.fields.title});
          });
        }
        this.videos = videos;
        return this.videos;
      });
  }
}
