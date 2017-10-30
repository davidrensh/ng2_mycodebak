import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlServiceTypeComponent } from './ctl-service-type.component';

describe('CtlServiceTypeComponent', () => {
  let component: CtlServiceTypeComponent;
  let fixture: ComponentFixture<CtlServiceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtlServiceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtlServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
