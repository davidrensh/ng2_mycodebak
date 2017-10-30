import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuctComponent } from './duct.component';

describe('DuctComponent', () => {
  let component: DuctComponent;
  let fixture: ComponentFixture<DuctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
