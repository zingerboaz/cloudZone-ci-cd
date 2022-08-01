import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUpdateTestComponent } from './manager-update-test.component';

describe('ManagerUpdateTestComponent', () => {
  let component: ManagerUpdateTestComponent;
  let fixture: ComponentFixture<ManagerUpdateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerUpdateTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerUpdateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
