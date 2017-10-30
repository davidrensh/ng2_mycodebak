import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertformsComponent } from './convertforms.component';

describe('ConvertformsComponent', () => {
  let component: ConvertformsComponent;
  let fixture: ComponentFixture<ConvertformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
