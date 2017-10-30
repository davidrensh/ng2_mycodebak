import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlLoginComponent } from './ctl-login.component';

describe('CtlLoginComponent', () => {
  let component: CtlLoginComponent;
  let fixture: ComponentFixture<CtlLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtlLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtlLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
