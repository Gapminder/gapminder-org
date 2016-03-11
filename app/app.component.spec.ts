import {
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';

import {AppComponent} from './app.component';

describe('App', () => {
  beforeEachProviders(() => [AppComponent]);

  it('should have default type', inject([AppComponent], (appComponent: AppComponent) => {
    expect(appComponent.type).toEqual('app component');
  }));
});
