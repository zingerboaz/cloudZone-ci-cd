import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatTestComponent } from './creat-test.component';

describe('CreatTestComponent', () => {
  let component: CreatTestComponent;
  let fixture: ComponentFixture<CreatTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
