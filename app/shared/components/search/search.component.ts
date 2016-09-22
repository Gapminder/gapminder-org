import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gm-search',
  template: require('./search.html') as string,
  styles: [require('./search.styl') as string]
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
