import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteData, RouteParams} from '@angular/router-deprecated';
import {MarkdownPipe} from '../../shared/pipes/markdown.pipe';
import {ContenfulContent} from '../../shared/services/contentful-content.service';
import {NodePageContent} from '../../shared/structures/content-type.structures';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component.ts';
import {ContentfulNodePage} from '../../shared/structures/aliases.structures';

@Component({
  template: require('./about.component.html') as string,
  directives: [...ROUTER_DIRECTIVES, SidebarComponent],
  styles: [require('./about.component.styl') as string],
  pipes: [MarkdownPipe]
})
export class AboutComponent implements OnInit {
  private content: ContentfulNodePage;
  private submenuItems: NodePageContent[] = [];

  private routerData: RouteData;
  private params: RouteParams;
  private contentfulContentService: ContenfulContent;

  public constructor(routerData: RouteData,
                     params: RouteParams,
                     contentfulContentService: ContenfulContent) {
    this.routerData = routerData;
    this.params = params;
    this.contentfulContentService = contentfulContentService;
  }

  public ngOnInit(): void {
    let slug = this.params.get('slug') || this.routerData.get('contentfulSlug');
    this.contentfulContentService
      .getAboutPage(slug)
      .subscribe((response: {submenuItems: any[], content: ContentfulNodePage}) => {
          this.submenuItems = response.submenuItems;
          this.content = response.content;
      });
  }
}
