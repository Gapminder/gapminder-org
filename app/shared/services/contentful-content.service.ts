import {Injectable} from 'angular2/core';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {ContentfulConfig} from '../../app.constans';
import {transformResponse} from '../tools/response.tools';
import {NodePageContent} from '../structures/content-type.structures';

/**
 * ContentfulContent works as a replacement for the original ng2-contentful library.
 * It adds next abstraction layer for contenful requests,
 * and any type of custom request and request transformation used in gapminder-org
 * should be implemented here.
 *
 * !! Still in developing !!
 */
@Injectable()
export class ContenfulContent {
  constructor(private _contentful: ContentfulService) {
  }

  /**
   *
   *  @param slug - slug of the current about content
   */
  getAboutPage(slug: string): Observable<{submenuItems: any[], content: NodePageContent}> {
    return Observable.create(
      (observer: Observer<{submenuItems: any[], content: NodePageContent}>) => {
        this.getRawNodePageBySlug(slug)
          .subscribe(
            response => {
              observer.next({
                submenuItems: this.getSubmenuItemsFromResponse(response),
                content: transformResponse<any>(response)[0]
              });
              observer.complete();
            }
          );
      }
    );
  }

  getNodePagesByType(type: string): Observable<NodePageContent[]> {
    return Observable.create(
      (observer: Observer<any>) => {
        this.contentful
          .withLinksLevel(0)
          .searchEntries(
            ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
            {param: 'fields.type', value: type}
          )
          .map(response => <any>response.json())
          .subscribe(
            response => {
              observer.next(response.items);
              observer.complete();
            }
          );
      }
    );

  }

  /**
   *
   * @param slug
   * @returns {any}
   */
  getNodePage(slug: string): Observable<NodePageContent> {
    return Observable.create(
      (observer: Observer<any>) => {
        this.getRawNodePageBySlug(slug)
          .map(response => transformResponse<any>(response))
          .subscribe(
            response => {
              observer.next(response[0].fields);
              observer.complete();
            }
          );
      }
    );
  }

  /**
   * this is only temporary, I'll change it in ng2-contentful library
   * 2 will be default value ( in mostly cases it's sufficient )
   * @returns {ContentfulService}
   */
  private get contentful(): ContentfulService {
    return this._contentful.withLinksLevel(2);
  }

  private getRawNodePageBySlug(slug: string): Observable<any> {
    return this.contentful
      .getEntryBySlug(
        ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
        slug
      ).map(response => response.json());
  }

  private getSubmenuItemsFromResponse(response) {
    let includes = {};
    let submenuItems = [];
    for (let entry of response.includes.Entry) {
      includes[entry.sys.id] = entry.fields;
    }
    // about subsection menu
    let item = response.items[0];
    includes[item.sys.id] = item.fields;
    let subsectionSysId = item.fields.subsections.sys.id;
    // collect subsections
    for (let subsection of includes[subsectionSysId].nodes) {
      submenuItems.push(
        includes[subsection.sys.id]
      );
    }
    return submenuItems;
  }
}
