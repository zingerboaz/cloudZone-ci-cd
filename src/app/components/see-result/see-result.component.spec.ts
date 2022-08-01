import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeResultComponent } from './see-result.component';

describe('SeeResultComponent', () => {
  let component: SeeResultComponent;
  let fixture: ComponentFixture<SeeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
