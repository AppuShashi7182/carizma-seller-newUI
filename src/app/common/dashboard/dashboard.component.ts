import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISellerVehicle } from 'src/app/models/ISellVechile';
// import { NHTSAService } from 'src/app/services/';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/common/confirm-modal/confirm-modal.component';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import {
  contact_title,
  conatc_message,
  accept_title,
  accept_message,
} from 'src/app/constants.ts/constants';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import {
  IOfferData,
  IOfferStatusData,
  IVechileModelDetails,
} from 'src/app/models/IVechile';
import { ReviewService } from 'src/app/services/review.service';
import { MatDialog } from '@angular/material/dialog';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { ReviewModalComponent } from '../review-modal/review-modal.component';

interface Country {
  make: string;
  model: string;
  year: string | number;
  offer: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sellerVehicleDetails: Observable<ISellerVehicle[]> = of([]);
  isLoading: boolean = false;

  constructor(
    private _service: NHTSAService,
    private router: Router,
    public toaster: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.sellerVehicleDetails = this._service.getSellerVehicleDetails();
   // console.log(this.sellerVehicleDetails);
  }
  onOkClick(event: ISellerVehicle) {

    this._service
      .getSellerCompleteDetails(event.seller_id, event.vehicle_id).subscribe(
        (res) => {
          console.log('response', res);
          const reviewDialog = this.dialog.open(ReviewModalComponent, {
            data: { sellerVehicleDetails: res },
            height: '95%',
            width: '80%',
          });
        },
        (error) => {
          this.toaster.error('Error in Loading','Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true });
        }
      );

    // this.router.navigate(['/questionaire']);
  }
  getStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'warning';
        break;
      case 'REJECTED':
      case 'Reject':
        return 'danger';
        break;
      case 'APPROVED':
      case 'ACCEPTED':
        return 'success';
        break;

      default:
        return 'warning';
    }
  }

  accept(event: ISellerVehicle) {

    // this.router.navigate(['/assignments/renegotiate'], { queryParams: { assignmentID: row?.assignment_id } });

    this.router.navigate(['/profile'], { queryParams: { vehicle_id: event.vehicle_id } });

    // this.isLoading = true;
    // let offer: IOfferStatusData = new IOfferStatusData();
    // offer.seller_id = event.seller_id;
    // offer.vehicle_id = event.vehicle_id;
    // offer.acceptance_status = 'ACCEPTED';

    // this._service.RequestOffer(offer).subscribe(
    //   () => {
    //     this.isLoading = false;
        // this.toaster.war('Successfully Accepted teh offer.', 'Congratulations', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
    //     this.openDialog('accept');
    //     this.loadData();
    //   },
    //   (error: any) =>         this.toaster.error("Unable to Process request, Please try again", 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
    //   //need to change to warning
    // );    
  }

  reject(event: ISellerVehicle) {
    let offer: IOfferStatusData = new IOfferStatusData();
    offer.seller_id = event.seller_id;
    offer.vehicle_id = event.vehicle_id;
    offer.acceptance_status = 'REJECTED';
    this._service.RequestOffer(offer).subscribe(
      (s: any) => {
        this.openDialog('reject');
        this.loadData();
      },
      (error: any) => {
        this.toaster.error("Unable to Process request, Please try again", 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
      }
    );
    
  }

  openDialog(value: string): void {
    let title: string;
    let message: string;
    if (value == 'accept') {
      title = accept_title;
      message = accept_message;
    } else {
      title = 'Thank You!';
      message =
        'Our representative will be connecting with you shortly please feel free to look into other options.';
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: title, message: message, page: 'contact' },
    });

    dialogRef.beforeClosed().subscribe(() => {
      this.isLoading = true;
      // setTimeout(() => {
        this.isLoading = false;
        // this.router.navigateByUrl('/sell-car');
      // }, 1000);
    });
  }

  confirmDialog(event: ISellerVehicle) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      panelClass: 'my-class',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Reject') {
        this.reject(event);
      }
    });
  }
}
