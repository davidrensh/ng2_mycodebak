import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyersComponent } from './flyers.component';

describe('FlyersComponent', () => {
  let component: FlyersComponent;
  let fixture: ComponentFixture<FlyersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
