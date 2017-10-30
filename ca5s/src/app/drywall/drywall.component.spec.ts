import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrywallComponent } from './drywall.component';

describe('DrywallComponent', () => {
  let component: DrywallComponent;
  let fixture: ComponentFixture<DrywallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrywallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrywallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
