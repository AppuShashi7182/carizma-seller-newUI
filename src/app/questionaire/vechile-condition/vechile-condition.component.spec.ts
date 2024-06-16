import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileConditionComponent } from './vechile-condition.component';

describe('VechileConditionComponent', () => {
  let component: VechileConditionComponent;
  let fixture: ComponentFixture<VechileConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VechileConditionComponent]
    });
    fixture = TestBed.createComponent(VechileConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
