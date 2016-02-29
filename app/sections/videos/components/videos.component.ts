import {Component, OnInit, OnChanges, DoCheck} from 'angular2/core';
import {Router, RouteParams, CanActivate, RouteData} from 'angular2/router';

@Component({
  template: `
    <h2>Videos</h2>    
  `
})
export class Videos implements OnInit {
  constructor(private _routerData: RouteData) {
  }

  ngOnInit(): any {
    return undefined;
  }
}
