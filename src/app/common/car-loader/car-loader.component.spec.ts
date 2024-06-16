import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLoaderComponent } from './car-loader.component';

describe('CarLoaderComponent', () => {
  let component: CarLoaderComponent;
  let fixture: ComponentFixture<CarLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarLoaderComponent]
    });
    fixture = TestBed.createComponent(CarLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
