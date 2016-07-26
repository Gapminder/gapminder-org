import { Component, Input, OnInit } from '@angular/core';
import { DonateComponent } from './donate/donate.component';
import { RoutesManagerService, ContenfulContent } from 'ng2-contentful-blog';
import { Angulartics2On } from 'angulartics2';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'gm-sidebar',
  template: require('./sidebar.html') as string,
  styles: [require('./sidebar.styl') as string],
  directives: [DonateComponent, ROUTER_DIRECTIVES, Angulartics2On]
})
export class SidebarComponent implements OnInit {
  @Input()
  private relatedItems: Array<any> = [];

  /* tslint:disable:no-unused-variable */
  @Input() private contentSlug: string;
  /* tslint:enable:no-unused-variable */

  private routesManager: RoutesManagerService;
  private contentfulContentService: ContenfulContent;

  public constructor(routesManager: RoutesManagerService,
                     contentfulContentService: ContenfulContent) {
    this.routesManager = routesManager;
    this.contentfulContentService = contentfulContentService;
  }

  public ngOnInit(): void {
    if (this.relatedItems) {
      for (let item of this.relatedItems) {
        this.contentfulContentService.getArticleParentSlug(item.sys.id, (url: string) => {
          item.fields.url = this.routesManager.addRoute(url, {name: item.fields.title});
        });
      }
    }
  }
}
