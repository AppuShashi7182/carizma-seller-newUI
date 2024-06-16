import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WhatIsVinComponent } from 'src/app/common/what-is-vin/what-is-vin.component';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { AlertService } from 'src/app/services/alert.service';
import { CommondataSellService } from 'src/app/services/commondata-sell.service';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-vin-selection',
  templateUrl: './vin-selection.component.html',
  styleUrls: ['./vin-selection.component.css'],
})
export class VinSelectionComponent {
  isLoading: boolean = false;
  constructor(
    public dataService: SellCarStoreService,
    private router: Router,
    private _nhtsaervice: NHTSAService,
    private _bottomSheet: MatBottomSheet,
    public alertService: AlertService,
    private toaster: ToastrService,
  ) { }
  vin = new FormControl('', [Validators.required, Validators.minLength(17)]);
  public errorMessage={required:"",minlength:'',vinErrorText:''};
  go() {
    //this.validateVinNumber();
    console.log(this.getErrorMessage(),'this.getErrorMessage()')
    if (this.getErrorMessage() === '') {
      this.isLoading = true;

      this._nhtsaervice
        .getVechileDetailsByVIN(this.vin.value ?? '')
        .then((s) => {
          this.dataService.setCurrentSellVechileDetails({
            make: s.Make,
            model: s.Model,
            year: parseInt(s.ModelYear),
            state: '',
            plateNumber: '',
            trim: '',
            vin: this.vin.value ?? '',
          });
          console.log(s,'s')
          if(s.ErrorCode ==='0'){
            this.router.navigate(['/questionaire']);
          }else{
            this.errorMessage['vinErrorText']="Invalid VIN Number"
          }
          this.isLoading = false;

        })
        .catch((error) => {
          this.isLoading = false;
          if (error.message.includes('404')) {
            this.toaster.error('Error: 404 Not Found', 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
          } else if (error.message.includes('400')) {
            this.toaster.error('Error: 400 Invalid VIN', 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
          }
          else {
            this.toaster.error('Error ' + error.message, 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
          }
        });
    }
  }
  getErrorMessage() {
    let message = '';
    if (this.vin.hasError('required')) {
      message = 'VIN is required';
      // this.toaster.error('Error: ' + message, 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
      this.errorMessage['required']=message;
      return message;
    }
    this.vin.hasError('minlength')
      ? (message = 'Not a valid VIN. Please Provide Valid VIN')
      : (message = '');
    // this.toaster.error('Error: ' + message, 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
    this.errorMessage['minlength']=message;
    return message;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(WhatIsVinComponent);
  }
}
