import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteComponent } from './concrete.component';

describe('ConcreteComponent', () => {
  let component: ConcreteComponent;
  let fixture: ComponentFixture<ConcreteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcreteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
