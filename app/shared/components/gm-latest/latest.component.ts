import { Component, OnInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ToDatePipe, ContentfulNodePage, ContenfulContent, RoutesManagerService } from 'ng2-contentful-blog';
import * as _ from 'lodash';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'gm-latest',
  template: require('./latest.html') as string,
  styles: [require('./latest.styl') as string],
  directives: [ROUTER_DIRECTIVES],
  pipes: [ToDatePipe]
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
  private articleService: ArticleService;

  public constructor(contentfulContentService: ContenfulContent,
                     routesManager: RoutesManagerService,
                     articleService: ArticleService) {
    this.contentfulContentService = contentfulContentService;
    this.routesManager = routesManager;
    this.articleService = articleService;
  }

  public ngOnInit(): void {
    this.contentfulContentService
      .getTagsBySlug(this.tag).subscribe((tags: any[]) => {
      if (!_.isEmpty(tags)) {
        const tagId = _.get(_.first(tags), 'sys.id') as string;
        // FIXME: Should be removed - we need to ask contentful to filter this for us
        this.articleService.filterArticlesByProjectTag(this.contentfulContentService.getLatestArticlesByTag(tagId, this.limit))
          .mergeMap((articles: ContentfulNodePage[]) => this.contentfulContentService.getArticleWithFullUrlPopulated(articles))
          .subscribe((articles: ContentfulNodePage[]) => {
            this.routesManager.addRoutesFromArticles(... articles);
            this.articles = articles;
          });
      }
    });
  }
}
