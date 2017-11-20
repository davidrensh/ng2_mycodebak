import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EavestroughComponent } from './eavestrough.component';

describe('EavestroughComponent', () => {
  let component: EavestroughComponent;
  let fixture: ComponentFixture<EavestroughComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EavestroughComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EavestroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
