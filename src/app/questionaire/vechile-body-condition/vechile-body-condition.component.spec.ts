import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileBodyConditionComponent } from './vechile-body-condition.component';

describe('VechileBodyConditionComponent', () => {
  let component: VechileBodyConditionComponent;
  let fixture: ComponentFixture<VechileBodyConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VechileBodyConditionComponent]
    });
    fixture = TestBed.createComponent(VechileBodyConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
