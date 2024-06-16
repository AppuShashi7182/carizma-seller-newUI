import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerInstantOfferComponent } from './seller-instant-offer.component';

describe('SellerInstantOfferComponent', () => {
  let component: SellerInstantOfferComponent;
  let fixture: ComponentFixture<SellerInstantOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerInstantOfferComponent]
    });
    fixture = TestBed.createComponent(SellerInstantOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
