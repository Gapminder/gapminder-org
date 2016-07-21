import {
  addProviders, async, inject, TestComponentBuilder, ComponentFixture
} from '@angular/core/testing';
import { getBaseTestProviders } from '../../../../shared/tools/tests.tools';
import { LatestPostsComponent } from './latest-posts.component';

describe('Component: Latest Posts', () => {

  beforeEach(() => addProviders([
    ...getBaseTestProviders(),
    LatestPostsComponent
  ]));

  xdescribe('View', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => addProviders([
      TestComponentBuilder
    ]));

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(LatestPostsComponent)
        .then((f: ComponentFixture<any>) => fixture = f);
    })));

    it('should have proper amount of post items', (done: () => void) => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.blog-item').length).toBe(1);
      done();
    });

    it('should have subsection title', (done: () => void) => {
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
      expect((component as any).limit).toBe(3);
    });
  });
});
