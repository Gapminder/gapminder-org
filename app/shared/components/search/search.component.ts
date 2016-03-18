import {Component, EventEmitter, Output} from 'angular2/core';
import {Collapse} from 'ng2-bootstrap';

@Component({
  selector: 'search',
  template: <string> require('./search.html'),
  styles: [
    <string> require('./search.styl')
  ],
  directives: [Collapse]
})

export class SearchComponent {
  private collapsed: boolean = true;
  @Output() toggleSearchMenu: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.collapsed = !this.collapsed;
    this.toggleSearchMenu.emit(this.collapsed);
  }
}
