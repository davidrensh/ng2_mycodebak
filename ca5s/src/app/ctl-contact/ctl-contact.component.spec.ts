import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlContactComponent } from './ctl-contact.component';

describe('CtlContactComponent', () => {
  let component: CtlContactComponent;
  let fixture: ComponentFixture<CtlContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtlContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtlContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
