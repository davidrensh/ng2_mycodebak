import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricianComponent } from './electrician.component';

describe('ElectricianComponent', () => {
  let component: ElectricianComponent;
  let fixture: ComponentFixture<ElectricianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
