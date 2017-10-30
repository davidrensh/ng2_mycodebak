import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsreadComponent } from './newsread.component';

describe('NewsreadComponent', () => {
  let component: NewsreadComponent;
  let fixture: ComponentFixture<NewsreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
