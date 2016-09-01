import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulNodePage, ContentfulTagPage } from 'ng2-contentful-blog';
import _ = require('lodash');

@Injectable()
export class ArticleService {
  private constants: any;

  public constructor(@Inject('Constants') constants: any) {
    this.constants = constants;
  }

  public filterArticlesByProjectTag(notFilteredArticles: Observable<ContentfulNodePage[]>): Observable<ContentfulNodePage[]> {
    if (!notFilteredArticles) {
      return Observable.empty() as Observable<ContentfulNodePage[]>;
    }
    return notFilteredArticles
      .mergeMap((articles: ContentfulNodePage[]) => Observable.from(articles))
      .filter((article: ContentfulNodePage) => !!_.find(article.fields.tags, (tag: ContentfulTagPage) => tag.fields.slug === this.constants.PROJECT_TAG))
      .toArray();
  }
}
