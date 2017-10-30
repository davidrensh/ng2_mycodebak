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
import { SchedulewallthicknessComponent } from './schedulewallthickness.component';

describe('Component: Schedulewallthickness', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [SchedulewallthicknessComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SchedulewallthicknessComponent],
      (component: SchedulewallthicknessComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SchedulewallthicknessComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SchedulewallthicknessComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-schedulewallthickness></app-schedulewallthickness>
  `,
  directives: [SchedulewallthicknessComponent]
})
class SchedulewallthicknessComponentTestController {
}

