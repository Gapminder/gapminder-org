import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {Angulartics2On} from 'angulartics2/index';

@Component({
  selector: 'gm-tags',
  template: require('./list-tags.html') as string,
  directives: [RouterLink, Angulartics2On],
  styles: [require('./tags.styl') as string]
})
export class TagsComponent {
  // noinspection TsLint
  @Input()
  private listTags: string[] = [];

}

