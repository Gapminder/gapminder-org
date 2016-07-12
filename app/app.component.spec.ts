import {
  it,
  inject,
  addProviders
} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {getBaseTestProviders} from './shared/tools/tests.tools';

describe('App', () => {
  beforeEach(() => addProviders([
   ...getBaseTestProviders(), AppComponent]));

  it('should have default type', inject([AppComponent], (appComponent: AppComponent) => {
    expect(appComponent.type).toEqual('app component');
  }));
});
