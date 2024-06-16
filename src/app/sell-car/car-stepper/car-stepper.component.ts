import { Component, QueryList, ViewChild, ViewChildren, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationBuilder } from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { ISellerVechileDetails } from 'src/app/models/ISellerVechileDetails';
import { IOfferData, IVechileData, IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { ViewEncapsulation, Renderer2 } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Subject, takeUntil } from 'rxjs';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { VechileDetailsComponent } from 'src/app/questionaire/vechile-details/vechile-details.component';
import { ToastrService } from 'ngx-toastr';
import { IVechileDetailQuestionaire } from 'src/app/questionaire/questionsJson';
import { Router } from '@angular/router';
import { NHTSAService } from 'src/app/services/nhtsa-service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-car-stepper',
  templateUrl: './car-stepper.component.html',
  styleUrls: ['./car-stepper.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      state('left', style({
        transform: 'translateX(5%)',
      })),
      state('right', style({
        transform: 'translateX(-5%)',
      })),
      transition('left <=> right', animate('1s ease-in-out')),
    ]),
  ],
})
export class CarStepperComponent {
  private onDestroy$: Subject<void> = new Subject<void>();

  isLoading: boolean = false;
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  instantOfferAPICall: boolean = false;
  sellerDetails: ISellerVechileDetails | undefined;
  selectVechileDetails?: IVechileModelDetails;
  validator!: boolean;
  stepperNumber=10;
  srcImages: string = '';
  images: string[] = [
    '../../../assets/images/IMG_3302.PNG',
    '../../../assets/images/IMG_3303.PNG',
    '../../../assets/images/IMG_3304.PNG',
    '../../../assets/images/IMG_3305.PNG',
  ];
  carPosition=4;
  carPositionAnimation: string = 'left';

  @ViewChild('stepper') public myStepper!: MatStepper;
  @ViewChildren(MatStep) steps!: QueryList<MatStep>;
  @ViewChild(VechileDetailsComponent) vechileDetailsComponent!: VechileDetailsComponent;
  @ViewChild('animatedElement') animatedElement: ElementRef | undefined;
  constructor(
    private _formBuilder: FormBuilder,
    public _store: SellCarStoreService,
    public nhtsa: NHTSAService,
    private renderer: Renderer2,
    public router: Router,
    public reviewService: ReviewService,
    private toaster: ToastrService,
    private animationBuilder: AnimationBuilder,
    private gaService: GoogleAnalyticsService
  ) {
    // this._store.loadSellerDetails();
    this.selectVechileDetails = this._store.sellerCompleteDetails.carDetails;
  }

  ngOnInit() {
    this.reviewService
      .getStepperIndex()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((index: number) => {
        this.myStepper.selectedIndex = index;
      });
    if (!this.selectVechileDetails?.year || !this.selectVechileDetails?.make || !this.selectVechileDetails?.model) {
      this.router.navigateByUrl('/sell-car')
    }
  }

  ngAfterViewInit() {
    const stepperHeaderElements = document.querySelectorAll('.mat-step-icon');

    stepperHeaderElements.forEach((headerElement, index) => {
      const color = this.getStepIconColor(index);
      this.renderer.setStyle(headerElement, 'background-color', color);
    });
    // this.steps.forEach((step) => {
    //   step.editable = false;
    //   step.completed = false;
    // });
  }

  getStepIconColor(stepIndex: number): string {
    switch (stepIndex) {
      case 0:
        return '#ff0000'; // Red
      case 1:
      case 2:
      case 3:
        return '#ffd800'; // yellow
      case 4:
        return '#ffd800'; // green
      default:
        return '#10ff0a';
    }
  }

  imageRandom(): string {
    let img = this.images[Math.floor(Math.random() * this.images.length)];
    return img;
  }
  onStepChange(event: any) {
    if (event.selectedIndex == 5) {
      this.srcImages = this.imageRandom();
    }
  }
  playAnimation() {
    if (this.animatedElement) {
    let factory :any;
    if(this.carPositionAnimation === 'right'){
      factory = this.animationBuilder.build([
        style({transform: 'translateX(-5%)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]);
    }else{
      factory = this.animationBuilder.build([
        style({transform: 'translateX(0)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(-5%)' }))
      ]);
    }
    const player = factory.create(this.animatedElement.nativeElement);
    player.play();
  }else {
    console.error("Element 'animatedElement' is undefined.");
  }
  }
  

  validateStepperOne(event: boolean) {
     this.validator = event;
  }
  toggleAnimation(key:any) {
    this.carPositionAnimation = (this.carPositionAnimation === 'left' && key === 'sub') ? 'right' : 'left';
  }
  
  getPageNumber(props:any){
    console.log(props,this.reviewService,'props')
    if(this.reviewService?.activateContactPage){
      this.setNoTittleDefaultValue()
      return;
    }
    if(props.data !== 'end-of-section'){
    if(props.page === 'add'){
      this.carPositionAnimation = 'right'
      this.playAnimation()
      this.stepperNumber+=4.68;
      this.carPosition+=4.68;
    }else{
      this.carPositionAnimation = 'left'
      this.playAnimation()
      this.stepperNumber-=4.68;
      this.carPosition-=4.68;
    }
  }else{
    this.carPositionAnimation = 'right'
    this.playAnimation()
    let remainingPosition=100-this.stepperNumber
    this.stepperNumber+=Math.abs(remainingPosition);
    this.carPosition+=Math.abs(remainingPosition);
    // this.setNoTittleDefaultValue();
    this.myStepper.next()
  }
    console.log(props.page,this.stepperNumber)

  }
  nextStep(index: number) {
    console.log(index,this.stepperNumber,this.reviewService.conatctPageStepper)
    let sellerDetails  = this._store.sellerCompleteDetails;
    // if(index === 0 && sellerDetails.vehicleDetails.carTitle 
    //   && sellerDetails.vehicleDetails.mileage 
    //   && sellerDetails.vehicleDetails.zipCode 
    //   && sellerDetails.vehicleDetails.vechileTransmissionType) {
        
    //   this.validator = true
    // }
    if (this.reviewService.vehicleDetailsPageStepper && index == 0) {
      this.validator = true;
    }
    if (this.reviewService.vehicleConditionPageStepper && index == 1) {
      this.validator = true;
    }
     if (this.reviewService.vehicleBodyConditionPageStepper && index == 2) {
      this.validator = true;
      }else {
      this.validator = false;
    }
     if (this.reviewService.conatctPageStepper && index == 3) {
      this.validator = true;
    } 
     if (index == 4) {
      this.validator = true;
    }
    console.log(this.validator,'validator')
    if (this.validator) {
      if (index == 4) {
        this.callApiToGetInstantOffer()
        return;
      }
      this.myStepper.next();
      this.validator = false
    } else {
      this.toaster.warning('Please fill all the required Fields', 'Warning', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
    }



    // this.disableSteppers();

  }

  prevStep(index: number) {
    this.myStepper.previous();
    // this.disableSteppers();
  }

  disableSteppers() {
    this.myStepper._steps.forEach((step, i) => {

      step.completed = false;
      step.editable = false;

    })
  }

  setNoTittleDefaultValue() {
    this._store.sellerCompleteDetails.vehicleDetails.color = 'other';
    this._store.sellerCompleteDetails.vehicleDetails.carLoan = false;
    this._store.sellerCompleteDetails.vehicleCondition.doesCarStart = false;
    this._store.sellerCompleteDetails.vehicleCondition.doesCarDrive = false;
    this._store.sellerCompleteDetails.vehicleCondition.doesCarHaveMechanicalIssues = false;
    this._store.sellerCompleteDetails.vehicleCondition.carEngineandTransmission = false;
    this._store.sellerCompleteDetails.vehicleCondition.doesInteriorIntact = false;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesCarSufferedFloodorFireDamage = false;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesAirbagsDeployedOrMissing = true;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesAllCarWheelInflated = true;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesBodyDamage = true;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesBodyDamageSeverity = '1';
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesBodyPanelIntact = false;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.noticeableDingsDentsScratches = false;
    this._store.sellerCompleteDetails.vehicleCondition.externalConditions.doesAllGlassorLightCracked = false;
    

    this._store.sellerCompleteDetails.vehicleDetails.mileage = 300000;
    this.router.navigateByUrl('contact-us')
  }

  callApiToGetInstantOffer() {
    this.isLoading = true;
    // setTimeout(() => {
      // let currentOffer = {} as IOfferData
      // currentOffer.instant_offer_price = 9850;
      // currentOffer.seller_id = 12345
      // currentOffer.vehicle_id = 56128
      // this.reviewService.currentOffer = currentOffer
      // this.reviewService.offerPrice = currentOffer.instant_offer_price
      console.log('Final value of Intact',this._store.sellerCompleteDetails.vehicleCondition);
      this.nhtsa.getInstantOffer(this._store.sellerCompleteDetails).subscribe(
        (res) => {
          this.gaService.sendEvent('conversion', { 'send_to': 'AW-852077583/PqSyCNSMg7cZEI_YppYD' });
          this.reviewService.currentOffer = res;
          console.log('Result on submit---', res);
          this.reviewService.offerPrice = res.instant_offer_price;
          this.myStepper.next()
          this.isLoading = false
          this.nhtsa.updateSalesForceDetails(res?.seller_id, res?.vehicle_id).subscribe(
            (response) => {
              console.log('Success');
            }
          );
        },
        (err) => {
          this.reviewService.offerPrice = undefined
          this.isLoading = false;
          this.myStepper.next()
          this.toaster.warning('Voila! We’d love to make an offer for your car. Our team is working on it and will reach out to you shortly.', 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
        }
      );
      
    // }, 2000);
    // this.isLoading = false;
    //     this.myStepper.next()
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
