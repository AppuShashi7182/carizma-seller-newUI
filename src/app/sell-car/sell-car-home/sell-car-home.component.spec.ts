import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCarHomeComponent } from './sell-car-home.component';

describe('SellCarHomeComponent', () => {
  let component: SellCarHomeComponent;
  let fixture: ComponentFixture<SellCarHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellCarHomeComponent]
    });
    fixture = TestBed.createComponent(SellCarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
