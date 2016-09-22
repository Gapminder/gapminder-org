import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { ContentfulNodePage } from 'ng2-contentful-blog/components/contentful/aliases.structures';
import { ContenfulContent } from 'ng2-contentful-blog/components/contentful/contentful-content.service';
import { RoutesManagerService } from 'ng2-contentful-blog/components/routes-gateway/routes-manager.service';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'gm-latest',
  template: require('./latest.html') as string,
  styles: [require('./latest.styl') as string]
})
export class LatestComponent implements OnInit {
  @Input()
  private limit: number = 3;

  @Input()
  private tag: string = '';

  /* tslint:disable */
  @Input()
  private title: string = '';
  /* tslint:enable */

  private articles: ContentfulNodePage[];
  private contentfulContentService: ContenfulContent;
  private routesManager: RoutesManagerService;

  public constructor(contentfulContentService: ContenfulContent,
                     routesManager: RoutesManagerService) {
    this.contentfulContentService = contentfulContentService;
    this.routesManager = routesManager;
  }

  public ngOnInit(): void {
    this.contentfulContentService
      .getTagsBySlug(this.tag).subscribe((tags: any[]) => {
      if (!_.isEmpty(tags)) {
        const tagId = _.get(_.first(tags), 'sys.id') as string;
        this.contentfulContentService.getLatestArticlesByTag(tagId, this.limit)
          .mergeMap((articles: ContentfulNodePage[]) => this.contentfulContentService.getArticleWithFullUrlPopulated(articles))
          .subscribe((articles: ContentfulNodePage[]) => {
            this.routesManager.addRoutesFromArticles(... articles);
            this.articles = articles;
          });
      }
    });
  }
}
