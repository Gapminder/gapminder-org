import {
  it,
  inject,
  beforeEachProviders
} from '../../../node_modules/angular2/testing.d';

import {AppComponent} from './app.component.ts';

describe('App', () => {
  beforeEachProviders(() => [AppComponent]);

  it('should have default type', inject([AppComponent], (appComponent: AppComponent) => {
    expect(appComponent.type).toEqual('app component');
  }));
});
