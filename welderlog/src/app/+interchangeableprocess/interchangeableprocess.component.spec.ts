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
import { InterchangeableprocessComponent } from './interchangeableprocess.component';

describe('Component: Interchangeableprocess', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [InterchangeableprocessComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([InterchangeableprocessComponent],
      (component: InterchangeableprocessComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(InterchangeableprocessComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(InterchangeableprocessComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-interchangeableprocess></app-interchangeableprocess>
  `,
  directives: [InterchangeableprocessComponent]
})
class InterchangeableprocessComponentTestController {
}

