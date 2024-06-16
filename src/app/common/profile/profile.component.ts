import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISellerVehicle, ProfileInfoObject } from 'src/app/models/ISellVechile';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IOfferStatusData
} from 'src/app/models/IVechile';
import {
  contact_title,
  conatc_message,
  accept_title,
  accept_message,
} from 'src/app/constants.ts/constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent {
  isLoading: boolean = false;
  profileFormGroup: FormGroup = new FormGroup({})
  sellerVehicleDetails: Observable<ISellerVehicle[]> = of([]);
  sellerProfile: ProfileInfoObject =  new ProfileInfoObject();
  LocationOptions: string[] = ['Residence', "Office", "Others"];
  
  vehicle_id: any;

  constructor(private router: Router, private _service: NHTSAService, private toaster: ToastrService, public dialog: MatDialog, private route: ActivatedRoute) {    
    this.profileFormGroup = new FormGroup({
      seller_id: new FormControl('', Validators.required),
      email_id: new FormControl('', Validators.required),
      customer_contact_number: new FormControl('', [Validators.required,
        Validators.pattern(/^[0-9\-]*$/), ]),
      charity_name: new FormControl('', Validators.required),
      donor_email: new FormControl('', [Validators.required,Validators.email ]),
      customer_name: new FormControl( '',Validators.required),
      vehicle_owner_name: new FormControl('', Validators.required),
      payee_name: new FormControl('', Validators.required),
      location_type: new FormControl('', [Validators.required,]),
      apt_number: new FormControl('', Validators.required),
      street_address_line1: new FormControl('', [Validators.required]),
      street_address_line2: new FormControl('', Validators.required),
      city: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required,
        Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/),]),
      locationOptions: new FormControl(this.LocationOptions),
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
        this.vehicle_id = params;
      }
    );
    this.loadData();
  }

  loadData() {
    this._service.getUserProfileDetails().subscribe(data => {
      console.log('Profile info',data);
      this.sellerProfile = data;
        this.profileFormGroup.setValue({
        seller_id: data.seller_id,
        email_id: data.email_id,
        customer_contact_number: data.customer_contact_number,
        charity_name: data.charity_name,
        donor_email: data.donor_email,
        customer_name: data.customer_name,
        vehicle_owner_name: data.vehicle_owner_name,
        payee_name: data.payee_name,
        location_type: data.location_type,
        apt_number: data.apt_number,
        street_address_line1: data.street_address_line1,
        street_address_line2: data.street_address_line2,
        city: data.city,
        zip_code: data.zip_code,
        locationOptions: this.LocationOptions})
      });
    };

    onSubmit() {
        this.sellerProfile.customer_contact_number= this.profileFormGroup.value.customer_contact_number;
        this.sellerProfile.charity_name= this.profileFormGroup.value.charity_name;
        this.sellerProfile.donor_email= this.profileFormGroup.value.donor_email;
        this.sellerProfile.customer_name= this.profileFormGroup.value.customer_name;
        this.sellerProfile.vehicle_owner_name= this.profileFormGroup.value.vehicle_owner_name;
        this.sellerProfile.payee_name= this.profileFormGroup.value.payee_name;
        this.sellerProfile.location_type= this.profileFormGroup.value.location_type;
        this.sellerProfile.apt_number= this.profileFormGroup.value.apt_number;
        this.sellerProfile.street_address_line1= this.profileFormGroup.value.street_address_line1;
        this.sellerProfile.street_address_line2= this.profileFormGroup.value.street_address_line2;
        this.sellerProfile.city= this.profileFormGroup.value.city;
        this.sellerProfile.zip_code= this.profileFormGroup.value.zip_code;
        this._service.updateUserProfileDetails(this.sellerProfile).subscribe(
          (response)=>{
            // alert('Profile is saved');

            this.isLoading = true;
            let offer: IOfferStatusData = new IOfferStatusData();
            offer.seller_id = this.sellerProfile.seller_id;
            offer.vehicle_id = this.vehicle_id?.params?.vehicle_id;
            offer.acceptance_status = 'ACCEPTED';

            this._service.RequestOffer(offer).subscribe(
              () => {
                this.isLoading = false;
                this.openDialog('accept');
                this.loadData();
              },
              (error: any) =>         this.toaster.error("Unable to Process request, Please try again", 'Error', { timeOut: 4000, positionClass: 'toast-top-right', closeButton: true })
              //need to change to warning
            );
          },(error)=>{
            console.error('Error');
          }
        ) 
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
          this._service.updateSalesForceDetails(this.sellerProfile.seller_id, this.vehicle_id?.params?.vehicle_id).subscribe(
            (response) => {
              console.log('Success');
            }
          );
          this.router.navigateByUrl('/dashboard');
        // }, 1000);
      });
    }
}
