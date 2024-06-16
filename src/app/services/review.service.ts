import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IOfferData } from '../models/IVechile';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private subject = new Subject<number>();
    stepperIndex: number = 0
    activateContactPage: boolean = false;
    vehicleDetailsPageStepper: boolean = false;
    vehicleConditionPageStepper: boolean = false;
    vehicleBodyConditionPageStepper: boolean = false;
    conatctPageStepper: boolean = false;
    reviewPageStepper: boolean = false;
    contactPage: boolean = false;

    offerPrice?: number;
    currentOffer?: IOfferData;

    constructor() { }

    setStepperIndex(index: number) {
        this.stepperIndex = index
        this.subject.next(index);
    }
    getStepperIndex(): Observable<number> {
        return this.subject.asObservable();
    }
}
