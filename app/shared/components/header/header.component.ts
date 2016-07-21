import { Component, Inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router-deprecated';
import { CollapseDirective, DROPDOWN_DIRECTIVES } from 'ng2-bootstrap';
import { RootComponent } from '../../../sections/root/root.component';
import { SearchComponent } from '../search/search.component';
import { HeaderMenuComponent } from 'ng2-contentful-blog';

import { Angulartics2On } from 'angulartics2/index';

@Component({
  selector: 'gm-header',
  template: require('./header.html') as string,
  styles: [require('./header.styl') as string],
  directives: [HeaderMenuComponent, CollapseDirective, DROPDOWN_DIRECTIVES, RouterLink, SearchComponent, Angulartics2On]
})
export class HeaderComponent {
  private isOnRootView: boolean;
  private collapsed: boolean = true;
  private router: Router;

  public constructor(@Inject(Router) router: Router) {
    this.router = router;
    this.router.subscribe((res: any) => {
      this.isOnRootView = res.instruction.componentType === RootComponent;
    });
  }

  public toggle(collapsed: boolean): void {
    this.collapsed = collapsed;
  }
}
