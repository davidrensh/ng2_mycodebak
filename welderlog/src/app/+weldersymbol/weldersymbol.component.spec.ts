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
import { WeldersymbolComponent } from './weldersymbol.component';

describe('Component: Weldersymbol', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [WeldersymbolComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([WeldersymbolComponent],
      (component: WeldersymbolComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(WeldersymbolComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(WeldersymbolComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-weldersymbol></app-weldersymbol>
  `,
  directives: [WeldersymbolComponent]
})
class WeldersymbolComponentTestController {
}

