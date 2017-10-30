import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialShareButtonComponent } from './social-share-button.component';

describe('SocialShareButtonComponent', () => {
  let component: SocialShareButtonComponent;
  let fixture: ComponentFixture<SocialShareButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialShareButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialShareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
