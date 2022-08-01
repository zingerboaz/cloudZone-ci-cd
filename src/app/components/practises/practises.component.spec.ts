import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractisesComponent } from './practises.component';

describe('PractisesComponent', () => {
  let component: PractisesComponent;
  let fixture: ComponentFixture<PractisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PractisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
