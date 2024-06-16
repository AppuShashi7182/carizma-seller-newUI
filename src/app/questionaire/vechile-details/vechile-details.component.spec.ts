import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileDetailsComponent } from './vechile-details.component';

describe('VechileDetailsComponent', () => {
  let component: VechileDetailsComponent;
  let fixture: ComponentFixture<VechileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VechileDetailsComponent]
    });
    fixture = TestBed.createComponent(VechileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
