import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyworkflowComponent } from './myworkflow.component';

describe('MyworkflowComponent', () => {
  let component: MyworkflowComponent;
  let fixture: ComponentFixture<MyworkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyworkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
