import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../services/contentful-content.service';
import {AsyncPipe} from 'angular2/common';
import {ContentfulConfig} from '../../../app.constans';
import {ContentfulPageStructure} from '../../structures/aliases.structures';

@Component({
  selector: 'footer',
  template: <string> require('./footer.html'),
  directives: [RouterLink],
  styles: [<string> require('./footer.styl')],
  pipes: [AsyncPipe]

})

export class Footer implements OnInit {
  private children: Observable<ContentfulPageStructure[]>;

  constructor(private _contentfulContent: ContenfulContent) {
  }

  ngOnInit(): void {

    this.children = this._contentfulContent
      .getPageTree(ContentfulConfig.CONTENTFUL_PAGE_TREE_FOOTER_ID)
      .map(response => response.structure.children);

  }
}
