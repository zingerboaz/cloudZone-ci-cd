import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerTestPageComponent } from './answer-test-page.component';

describe('AnswerTestPageComponent', () => {
  let component: AnswerTestPageComponent;
  let fixture: ComponentFixture<AnswerTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerTestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
