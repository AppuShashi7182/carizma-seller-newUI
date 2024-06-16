import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinSelectionComponent } from './vin-selection.component';

describe('VinSelectionComponent', () => {
  let component: VinSelectionComponent;
  let fixture: ComponentFixture<VinSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VinSelectionComponent]
    });
    fixture = TestBed.createComponent(VinSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
