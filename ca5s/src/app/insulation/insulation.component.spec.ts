import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulationComponent } from './insulation.component';

describe('InsulationComponent', () => {
  let component: InsulationComponent;
  let fixture: ComponentFixture<InsulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
