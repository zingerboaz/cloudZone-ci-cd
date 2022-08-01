import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignResult1Component } from './sign-result1.component';

describe('SignResult1Component', () => {
  let component: SignResult1Component;
  let fixture: ComponentFixture<SignResult1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignResult1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignResult1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
