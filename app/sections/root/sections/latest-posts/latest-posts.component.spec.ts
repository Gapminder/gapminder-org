import {
  it, beforeEachProviders, beforeEach, TestComponentBuilder, ComponentFixture, injectAsync, inject
} from 'angular2/testing';
import {getBaseTestProviders} from '../../../../shared/tools/tests.tools';
import {LatestPostsComponent} from './latest-posts.component';

describe('Component: Latest Posts', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    LatestPostsComponent
  ]);

  describe('View', () => {
    let fixture: ComponentFixture;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(LatestPostsComponent)
        .then(f => fixture = f);
    }));

    it('should have proper amount of post items', done => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.blog-item').length).toBe(1);
      done();
    });

    it('should have subsection title', done => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('.post-head').length).toBe(1);
      done();
    });

    // it('should have button link', () => {
    //   expect(fixture.nativeElement.querySelectorAll('.row > button').length).toBe(1);
    // });

    // it('button link should navigate to posts', () => {
    //   this one will fail now
    // });
  });

  describe('Component', () => {
    let component: LatestPostsComponent;

    beforeEach(inject([LatestPostsComponent], (_component: LatestPostsComponent) => {
      component = _component;
    }));

    it('should have default limit value equal to 3', () => {
      expect((<any>component).limit).toBe(3);
    });
  });
});
