import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlAddressComponent } from './ctl-address.component';

describe('CtlAddressComponent', () => {
  let component: CtlAddressComponent;
  let fixture: ComponentFixture<CtlAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtlAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtlAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
