import { Component, EventEmitter, Output } from '@angular/core';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { IContact } from '../questionsJson';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-seller-contact',
  templateUrl: './seller-contact.component.html',
  styleUrls: ['./seller-contact.component.css'],
})
export class SellerContactComponent {
  checked: boolean = false;
  contactFormGroup: FormGroup = new FormGroup({});
  @Output() contactStepValidation = new EventEmitter<boolean>();

  selectedContact: IContact;
  constructor(public _store: SellCarStoreService, public reviewService: ReviewService) {
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
      checkbox: new FormControl(this.checked, Validators.requiredTrue),
    });
  }

  onSubmit() {
    if (this.contactFormGroup.valid) {
      this._store.sellerCompleteDetails.contact = this.selectedContact;
      this.contactStepValidation.emit(true);
    } else {
      this.contactStepValidation.emit(false);
    }
  }

  ngOnInit() {
    this.contactFormGroup.valueChanges.subscribe((formData) => {
      this.selectedContact.email = formData.email;
      this.selectedContact.fullName = formData.fullName;
      this.selectedContact.mobile = formData.mobile;
      this.reviewService.conatctPageStepper = formData.checkbox
      this.onSubmit();
    });
  }
}
