import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { AlertService } from 'src/app/services/alert.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})
export class ReviewPageComponent {
  sellerCarDetails: ISellerVechileDetails;
  selectedMake?: string = '';
  isLoading: boolean = false;

  // checked: boolean = false;
  @Output() reviewPageValidated = new EventEmitter<boolean>();

  // reviewCheckbox = new FormControl(null, Validators.requiredTrue)
  constructor(
    private reviewService: ReviewService,
    public _store: SellCarStoreService,
    private alertService: AlertService,
    private _nhtsaervice: NHTSAService
  ) {
    this.selectedMake = this._store.sellerCompleteDetails.carDetails?.make;
    this.sellerCarDetails = _store.sellerCompleteDetails;

  }

  ngOnInit() {
    // this.isLoading = true;
    // this._nhtsaervice.getInstantOffer(this._store.sellerCompleteDetails).subscribe((res) => {
    //   setTimeout( () =>this.isLoading = false, 3000);
    //   // this.offerPrice = Math.floor(Math.random() * 300000);
    // },error => {
    //   this.isLoading = false;
    //   this.alertService.error('Error Occured while fetching instance offer: ', error.message)
    // })
    // this.checked = this.reviewCheckbox.value
    // if (this.reviewCheckbox.value) {
    //   this.checkValue(this.reviewCheckbox.value)
    // }
    // this.reviewCheckbox.valueChanges.subscribe(check => {
    //   this.checkValue(check)
    // })

  }
  // checkValue(value: any) {
  //   this.reviewService.reviewPageStepper = value
  //   if (value) {
  //     this.reviewPageValidated.emit(true);
  //   } else {
  //     this.reviewPageValidated.emit(false);
  //   }
  // }
  routeToStepperIndex(index: number) {
    this.reviewService.setStepperIndex(index);
  }

  navigate() {
    window.open('https://www.carizma.com/terms-and-conditions', '_blank');
      return;
  }
}
