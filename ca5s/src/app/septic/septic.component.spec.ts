import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SepticComponent } from './septic.component';

describe('SepticComponent', () => {
  let component: SepticComponent;
  let fixture: ComponentFixture<SepticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SepticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SepticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
