import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadInternComponent } from './upload-intern.component';

describe('UploadInternComponent', () => {
  let component: UploadInternComponent;
  let fixture: ComponentFixture<UploadInternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadInternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadInternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
