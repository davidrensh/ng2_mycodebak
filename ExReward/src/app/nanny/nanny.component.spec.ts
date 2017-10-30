import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NannyComponent } from './nanny.component';

describe('NannyComponent', () => {
  let component: NannyComponent;
  let fixture: ComponentFixture<NannyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NannyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NannyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
