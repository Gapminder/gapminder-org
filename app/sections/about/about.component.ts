import {Component, OnInit} from 'angular2/core';
import {RouteData, RouteParams} from 'angular2/router';
import {MarkdownPipe} from '../../shared/pipes/markdown.pipe';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ContenfulContent} from '../../shared/services/contentful-content.service';
import {NodePageContent} from '../../shared/structures/content-type.structures';
import {Sidebar} from '../../shared/components/sidebar/sidebar.component.ts';

/**
 *
 */
@Component({
  template: <string> require('./about.component.html'),
  directives: [...ROUTER_DIRECTIVES, Sidebar],
  styles: [<string> require('./about.component.styl')],
  pipes: [MarkdownPipe]
})
export class About implements OnInit {
  private content: NodePageContent;
  private submenuItems: NodePageContent[] = [];

  constructor(private _routerData: RouteData,
              private _params: RouteParams,
              private _contentfulContent: ContenfulContent) {
  }

  ngOnInit(): any {
    let slug = this._params.get('slug') || this._routerData.get('contentfulSlug');
    this._contentfulContent
      .getAboutPage(slug)
      .subscribe(
        response => {
          this.submenuItems = response.submenuItems;
          this.content = response.content;
        }
      );
    return undefined;
  }
}
