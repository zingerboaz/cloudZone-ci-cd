import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignResultComponent } from './sign-result.component';

describe('SignResultComponent', () => {
  let component: SignResultComponent;
  let fixture: ComponentFixture<SignResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
