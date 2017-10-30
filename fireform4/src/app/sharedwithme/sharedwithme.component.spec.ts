import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedwithmeComponent } from './sharedwithme.component';

describe('SharedwithmeComponent', () => {
  let component: SharedwithmeComponent;
  let fixture: ComponentFixture<SharedwithmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedwithmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedwithmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
