import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ChildweldtypeComponent } from './childweldtype.component';

describe('Component: Childweldtype', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ChildweldtypeComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ChildweldtypeComponent],
      (component: ChildweldtypeComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ChildweldtypeComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ChildweldtypeComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-childweldtype></app-childweldtype>
  `,
  directives: [ChildweldtypeComponent]
})
class ChildweldtypeComponentTestController {
}

