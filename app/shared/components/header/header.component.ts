import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Collapse, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {Root} from '../../../sections/root/root.component.ts';
import {SearchComponent} from '../search/search.component.ts';
import {PageStructure} from '../../services/page-structure.service';
import {PageStructureContent} from '../../structures/content-type.structures';

@Component({
  selector: 'header',
  template: <string> require('./header.html'),
  styles: [
    <string> require('./header.styl')
  ],
  directives: [Collapse, DROPDOWN_DIRECTIVES, RouterLink, SearchComponent]
})

export class Header {
  private structure: PageStructureContent;
  private isOnRootView: boolean;
  private collapsed: boolean = true;

  constructor(router: Router,
              private pageStructure: PageStructure) {
    this.structure = pageStructure.structure;
    router.subscribe((url) => {
      router.recognize(url).then((instruction) => {
        this.isOnRootView = instruction.component.componentType === Root;
      });
    });
  }

  toggle(collapsed) {
    this.collapsed = collapsed;
  }
}
