import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EavestoughComponent } from './eavestough.component';

describe('EavestoughComponent', () => {
  let component: EavestoughComponent;
  let fixture: ComponentFixture<EavestoughComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EavestoughComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EavestoughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
