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
import { TransferwelddataComponent } from './transferwelddata.component';

describe('Component: Transferwelddata', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [TransferwelddataComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([TransferwelddataComponent],
      (component: TransferwelddataComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(TransferwelddataComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(TransferwelddataComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-transferwelddata></app-transferwelddata>
  `,
  directives: [TransferwelddataComponent]
})
class TransferwelddataComponentTestController {
}

