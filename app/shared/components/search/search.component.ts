import { Component, EventEmitter, Output } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap';

@Component({
  selector: 'gm-search',
  template: require('./search.html') as string,
  styles: [require('./search.styl') as string],
  directives: [CollapseDirective]
})
export class SearchComponent {
  @Output()
  private toggleSearchMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  private collapsed: boolean = true;

  public toggle(): void {
    this.collapsed = !this.collapsed;
    this.toggleSearchMenu.emit(this.collapsed);
  }
}
