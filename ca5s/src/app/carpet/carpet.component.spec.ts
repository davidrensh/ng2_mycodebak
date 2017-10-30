import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetComponent } from './carpet.component';

describe('CarpetComponent', () => {
  let component: CarpetComponent;
  let fixture: ComponentFixture<CarpetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
