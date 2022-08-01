import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignResult2Component } from './sign-result2.component';

describe('SignResult2Component', () => {
  let component: SignResult2Component;
  let fixture: ComponentFixture<SignResult2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignResult2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignResult2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
