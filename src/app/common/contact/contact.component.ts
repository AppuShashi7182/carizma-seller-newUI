import { Component } from '@angular/core';
import { IContact } from 'src/app/questionaire/questionsJson';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ReviewService } from 'src/app/services/review.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { Router } from '@angular/router';
import { conatc_message, contact_title } from 'src/app/constants.ts/constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  checked !: boolean
  selectedContact: IContact;
  isLoading: boolean = false;
  contactFormGroup: FormGroup = new FormGroup({})
  constructor(public _store: SellCarStoreService, private reviewService: ReviewService, private router: Router, public nhtsa: NHTSAService, public toaster: ToastrService, public dialog: MatDialog) {
    this.selectedContact = this._store.sellerCompleteDetails.contact;
    this.contactFormGroup = new FormGroup({
      fullName: new FormControl(
        this.selectedContact.fullName,
        Validators.required
      ),
      email: new FormControl(this.selectedContact.email, [
        Validators.required,
        Validators.email,
      ]),
      mobile: new FormControl(this.selectedContact.mobile, [
        Validators.required,
        Validators.pattern(/^[0-9\-]*$/),
      ]),
      zipCode: new FormControl(this.selectedContact.zipCode, [
        Validators.required,
        Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/),
      ]),
      checkbox: new FormControl(this.checked, Validators.requiredTrue),
    });
  }

  ngOnInit() {
    this.contactFormGroup.valueChanges.subscribe((formData) => {
      this.selectedContact.email = formData.email;
      this.selectedContact.fullName = formData.fullName;
      this.selectedContact.mobile = formData.mobile;
      this.selectedContact.zipCode = formData.zipCode;
      this.reviewService.contactPage = formData.checkbox
    })
  }

  validateContactDetails() {
    if (this.contactFormGroup.valid) {
      this._store.sellerCompleteDetails.contact = this.selectedContact;
      this.nhtsa.getInstantOffer(this._store.sellerCompleteDetails).subscribe();
      this.openDialog()
    } else {
      this.toaster.warning('Please fill all the required Fields', 'Warning', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
    }
  }



  openDialog(): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: contact_title, message: conatc_message, page: 'contact' }
    });

    dialogRef.beforeClosed().subscribe(() => {
      this.isLoading = true;
      // setTimeout(() => {
        this.isLoading = false;
        this.router.navigateByUrl("/sell-car");
      // }, 1000);

    })
  }
}