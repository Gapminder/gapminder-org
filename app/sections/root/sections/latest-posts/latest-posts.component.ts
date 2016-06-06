import {Component, OnInit, Input, Inject} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {AsyncPipe} from '@angular/common';
import {ContenfulContent} from '../../../../shared/services/contentful-content.service';
import {ContentfulNodePage} from '../../../../shared/structures/aliases.structures';
import {ToDatePipe} from '../../../../shared/pipes/to-date.pipe';
import {RoutesGatewayService} from '../../../../shared/services/routes-gateway.service';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';
import {Angulartics2On} from 'angulartics2/index';

@Component({
  selector: 'gm-latest-posts',
  template: require('./latest-posts.html') as string,
  styles: [require('./latest-posts.styl') as string],
  directives: [RouterLink, Angulartics2On],
  pipes: [AsyncPipe, ToDatePipe]
})
export class LatestPostsComponent implements OnInit {
  @Input()
  private limit: number = 3;
  private posts: ContentfulNodePage[];
  private contentfulContentService: ContenfulContent;
  private routesGatewayService: RoutesGatewayService;
  private parentSlug: string = 'blog';
  private parentName: string = 'Blog';
  private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics;

  public constructor(@Inject(ContenfulContent) contentfulContentService: ContenfulContent,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService,
                     @Inject(Angulartics2GoogleAnalytics) angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    this.contentfulContentService = contentfulContentService;
    this.routesGatewayService = routesGatewayService;
    this.angulartics2GoogleAnalytics = angulartics2GoogleAnalytics;
  }

  public ngOnInit(): any {
    this.routesGatewayService.addRoute(this.parentSlug, {name: this.parentName});
    this.contentfulContentService.getLatestPosts(this.limit)
      .subscribe((posts: ContentfulNodePage[]) => {
        for (let post of posts) {
          this.routesGatewayService.getSlugParent(post.sys.id, (url: string) => {
            post.fields.url = this.routesGatewayService.addRoute(url, {name: post.fields.title});
          });
        }
        this.posts = posts;
        return this.posts;
      });
  }
}
