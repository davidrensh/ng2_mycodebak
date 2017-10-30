import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberadminComponent } from './memberadmin.component';

describe('MemberadminComponent', () => {
  let component: MemberadminComponent;
  let fixture: ComponentFixture<MemberadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
