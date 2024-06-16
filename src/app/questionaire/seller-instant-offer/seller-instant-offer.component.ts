import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/common/confirm-modal/confirm-modal.component';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { contact_title, conatc_message, accept_title, accept_message } from 'src/app/constants.ts/constants';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import {
  IOfferData,
  IOfferStatusData,
  IVechileModelDetails,
} from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-seller-instant-offer',
  templateUrl: './seller-instant-offer.component.html',
  styleUrls: ['./seller-instant-offer.component.css'],
})
export class SellerInstantOfferComponent {
  sellerDetails: ISellerVechileDetails | undefined;
  selectVechileDetails?: IVechileModelDetails;
  isLoading: boolean = false;
  offerPrice!: number;
  currentOffer: IOfferData | undefined;

  @Input() srcImages: string = '';
  @Input() callAPI: boolean = false;

  constructor(
    public _store: SellCarStoreService,
    public toaster: ToastrService,
    public nhtsa: NHTSAService,
    public reviewService: ReviewService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.sellerDetails = this._store.sellerCompleteDetails;
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;
    this.sellerDetails.vehicleDetails.mileage;
  }

  ngOnInit(): void {

  }
  accept() {
    this.isLoading = true;
    let offer: IOfferStatusData = new IOfferStatusData();
    offer.seller_id = this.reviewService.currentOffer?.seller_id;
    offer.vehicle_id = this.reviewService.currentOffer?.vehicle_id;
    offer.acceptance_status = 'Approve';
    console.log('In instant ofer:', offer);
    this.nhtsa
      .RequestOffer(offer)
      .subscribe((s) => {
        
          this.isLoading = false
        // this.toaster.war('Successfully Accepted teh offer.', 'Congratulations', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
        this.openDialog('accept')
      }, (error) => {
        this.toaster.error("Unable to Process request, Please try again", 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })

      })
  }

  reject() {
    let offer: IOfferStatusData = new IOfferStatusData();
    offer.seller_id = this.reviewService.currentOffer?.seller_id;
    offer.vehicle_id = this.reviewService.currentOffer?.vehicle_id;
    offer.acceptance_status = 'Reject';
    this.nhtsa
      .RequestOffer(offer)
      .subscribe((s) => { this.openDialog('reject') }, (error) => {
        this.toaster.error("Unable to process request, Please try again", 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })

       });
  }

  // //TODO:Move this change to service and call on review page next click.
  // ngOnChanges() {
  //   if (this.callAPI) {
  //     this.isLoading = true;
  //     setTimeout(() => (this.isLoading = false), 1000);
  //     this.nhtsa.getInstantOffer(this._store.sellerCompleteDetails).subscribe(
  //       (res) => {
  //         this.currentOffer = res;
  //         this.offerPrice = res.instant_offer_price;
  //       },
  //       (err) => {
  //         this.offerPrice = 0;
  //         this.isLoading = false;
  //         // this.toaster.warning('Unable to calculate the instant offer at the moment and our customer care team will reach out to you shortly.', 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
  //       }
  //     );
  //   }
  // }


  openDialog(value: string): void {
    let title: string;
    let message: string;
    if (value == 'accept') {
      title = accept_title;
      message = accept_message
    } else {
      title = 'Thank You!';
      message = 'You will be recieving the email and get a call from our representative shortly.'
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: title, message: message, page: 'contact' }
    });

    dialogRef.beforeClosed().subscribe(() => {
      this.isLoading = true;
        this.isLoading = false;
        this.router.navigateByUrl("/sell-car");
    

    })
  }

  routeToDashboard() {
    this.router.navigateByUrl("/dashboard")
  }
  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, { panelClass: 'my-class' });
    dialogRef.afterClosed().subscribe((result) => {

      if (result.event === 'Reject') {
        this.reject()
      }
    })
  }
}
