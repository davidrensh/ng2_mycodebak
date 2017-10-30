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
import { WeldprocedureComponent } from './weldprocedure.component';

describe('Component: Weldprocedure', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [WeldprocedureComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([WeldprocedureComponent],
      (component: WeldprocedureComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(WeldprocedureComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(WeldprocedureComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-weldprocedure></app-weldprocedure>
  `,
  directives: [WeldprocedureComponent]
})
class WeldprocedureComponentTestController {
}

