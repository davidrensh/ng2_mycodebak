import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlUploadImgComponent } from './ctl-upload-img.component';

describe('CtlUploadImgComponent', () => {
  let component: CtlUploadImgComponent;
  let fixture: ComponentFixture<CtlUploadImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtlUploadImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtlUploadImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
