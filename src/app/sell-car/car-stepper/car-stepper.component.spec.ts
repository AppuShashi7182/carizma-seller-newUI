import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarStepperComponent } from './car-stepper.component';

describe('CarStepperComponent', () => {
  let component: CarStepperComponent;
  let fixture: ComponentFixture<CarStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarStepperComponent]
    });
    fixture = TestBed.createComponent(CarStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
