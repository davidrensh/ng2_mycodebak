import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyersreadComponent } from './flyersread.component';

describe('FlyersreadComponent', () => {
  let component: FlyersreadComponent;
  let fixture: ComponentFixture<FlyersreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyersreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyersreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
