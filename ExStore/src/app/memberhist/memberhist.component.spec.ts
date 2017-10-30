import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberhistComponent } from './memberhist.component';

describe('MemberhistComponent', () => {
  let component: MemberhistComponent;
  let fixture: ComponentFixture<MemberhistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberhistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberhistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
