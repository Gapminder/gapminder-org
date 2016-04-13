import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {ContentfulConfig} from '../../app.constans';
import {transformResponse} from '../tools/response.tools';
import {NodePageContent} from '../structures/content-type.structures';
import {ContentfulService, ContentfulRequest, SearchItem} from 'ng2-contentful';
import {ContentfulNodePagesResponse, ContentfulNodePage, ContentfulPageStructure} from '../structures/aliases.structures';
import {PageStructure} from './page-structure.service';
import * as _ from 'lodash';

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
  constructor(private contentful: ContentfulService) {
  }

  /**
   *
   *  @param slug - slug of the current about content
   */
  getAboutPage(slug: string): Observable<{submenuItems: any[], content: NodePageContent}> {
    return this.getRawNodePageBySlug(slug)
      .map(response => {
        return {
          submenuItems: this.getSubmenuItemsFromResponse(response),
          content: transformResponse<any>(response)[0]
        };
      });
  }

  getLatestPosts(limit: number): Observable<ContentfulNodePage[]> {
    return this.getLatestItems<ContentfulNodePagesResponse>(
      this.getRawNodePagesByParams({
        param: 'fields.type',
        value: 'blogpost'
      }), limit
      )
      .map(response => response.items);
  }

  getOverviewPages(): Observable<ContentfulNodePage[]> {
    return this.getRawNodePagesByParams({
        param: 'fields.showInMainPageSlider',
        value: '1'
      })
      .commit<ContentfulNodePagesResponse>()
      .map(response => response.items);
  }

  getLatestVideo(limit: number) {
    return this.getLatestItems<ContentfulNodePagesResponse>(
      this.getRawNodePagesByParams({
        param: 'fields.type',
        value: 'video'
      }), limit
      )
      .map(response => response.items);
  }

  getNodePagesByType(type: string): Observable<ContentfulNodePage[]> {
    return this.contentful
      .create()
      .searchEntries(
        ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
        {param: 'fields.type', value: type}
      )
      .commit<ContentfulNodePagesResponse>()
      .map(response => response.items);
  }

  /**
   *
   * @param slug
   * @returns {any}
   */
  getNodePage(slug: string): Observable<NodePageContent> {
    return this.getRawNodePageBySlug(slug)
      .map(response => transformResponse<ContentfulNodePage>(response))
      .map(response => _.get(response, '[0].fields', null));
  }

  getPageTree(sysId: string): Observable<PageStructure> {
    return this.contentful
      .create()
      .searchEntries('pageTree', {
        param: 'sys.id',
        value: sysId
      })
      .include(3)
      .commit<any>()
      .map(response => transformResponse<ContentfulPageStructure>(response, 2)[0])
      .map((response: any) => {
        const structure = new PageStructure();
        structure.buildFromContentful(response.fields);
        return structure;
      })
  }

  private getRawNodePageBySlug(slug: string): Observable<any> {
    return this.contentful
      .create()
      .getEntryBySlug(
        ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
        slug
      )
      .include(2)
      .commit();
  }

  private getLatestItems<T>(request: ContentfulRequest, limit: number
    , order: string = '-sys.createdAt', include: number = 0): Observable<T> {
    return request
      .limit(limit)
      .order(order)
      .include(include)
      .commit<T>();
  }

  /**
   *
   * @param searchItems
   * @returns {ContentfulRequest}
   */
  private getRawNodePagesByParams(...searchItems: SearchItem[]): ContentfulRequest {
    return this.contentful
      .create()
      .searchEntries(
        ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID, ...searchItems);
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
