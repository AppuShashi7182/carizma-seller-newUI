import { Component, EventEmitter, Output } from '@angular/core';
import { IVechileConditionQuestionaire } from '../questionsJson';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { IVechileModelDetails } from 'src/app/models/IVechile';
import { MatSliderChange } from '@angular/material/slider';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-vechile-condition',
  templateUrl: './vechile-condition.component.html',
  styleUrls: ['./vechile-condition.component.css'],
})
export class VechileConditionComponent {
  selectedMake?: string = '';
  public vechileCondition: IVechileConditionQuestionaire;
  vehicleConditionFormGroup: FormGroup = new FormGroup({});
  @Output() stepTwoValidated = new EventEmitter<boolean>();
  @Output() stepThreeValidated = new EventEmitter<boolean>();

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(public _store: SellCarStoreService,public reviewService: ReviewService, private _formBuilder: FormBuilder) {
    this.selectedMake = this._store.sellerCompleteDetails.carDetails?.make;
    this.vechileCondition = this._store.sellerCompleteDetails.vehicleCondition;
    this.vehicleConditionFormGroup = new FormGroup({
      doesCarDrive: new FormControl(this.vechileCondition.doesCarDrive, Validators.required),
      doesCarStart: new FormControl(this.vechileCondition.doesCarStart, Validators.required),
      carEngineandTransmission: new FormControl(this.vechileCondition.carEngineandTransmission, Validators.required),
      doesCarHaveMechanicalIssues: new FormControl(this.vechileCondition.doesCarHaveMechanicalIssues, [Validators.required]),
      mechanicalIssues: new FormGroup({
        warningLights: new FormControl(false),
        Electrical: new FormControl(false),
        Mechanical: new FormControl(false),
        Suspension: new FormControl(false),
        Other: new FormControl(false),
      }),
      doesAllCarWheelInflated: new FormControl(this.vechileCondition.externalConditions.doesAllCarWheelInflated, Validators.required),
      doesAllGlassorLightCracked: new FormControl(this.vechileCondition.externalConditions.doesAllGlassorLightCracked, Validators.required),
      doesBodyDamage: new FormControl(this.vechileCondition.externalConditions.doesBodyDamage, Validators.required),
      doesBodyDamageSeverity: new FormControl(this.vechileCondition.externalConditions.doesBodyDamageSeverity),
      NoticeableDingsDentsScratches: new FormControl(this.vechileCondition.externalConditions.noticeableDingsDentsScratches, [Validators.required]),
      doesBodyPanelIntact: new FormControl(this.vechileCondition.externalConditions.doesBodyPanelIntact, [Validators.required]),
      doesAirbagsDeployedOrMissing: new FormControl(this.vechileCondition.externalConditions.doesAirbagsDeployedOrMissing, [Validators.required]),
      DoesCarSufferedFloodorFireDamage: new FormControl(this.vechileCondition.externalConditions.doesCarSufferedFloodorFireDamage, [Validators.required]),
      DoesInteriorIntact: new FormControl(this.vechileCondition.doesInteriorIntact, [Validators.required]),  
     });
  }
  mechanical  = {
    warningLights: 'Any warning lights (ABS, battery charge warning light, engine temperature etc.)',
    
  }

  doesCarDriveEvent(event: boolean) {
    this.vechileCondition.doesCarDrive = event;
  }

  onChangeDoesCarDrive(event : boolean) {
    if(!event) {
      this.vechileCondition.doesCarStart = true;
      this.vechileCondition.carEngineandTransmission = true;
    }
  }


  ngOnInit(){
    
    this.vehicleConditionFormGroup.get('doesCarDrive')?.valueChanges.subscribe((value) => {
      if(value) {
        this.vehicleConditionFormGroup.get('doesCarStart')?.setValue(true)
        this.vehicleConditionFormGroup.get('carEngineandTransmission')?.setValue(true)
      } else {  
        this.vehicleConditionFormGroup.get('doesCarStart')?.setValue(null)
        this.vehicleConditionFormGroup.get('carEngineandTransmission')?.setValue(null)
      }
      this.vechileCondition.doesCarDrive = value
    })

    this.vehicleConditionFormGroup.get('doesCarStart')?.valueChanges.subscribe((value) => {
      this.vechileCondition.doesCarStart = value
    })
    this.vehicleConditionFormGroup.get('carEngineandTransmission')?.valueChanges.subscribe((value) => {
      this.vechileCondition.carEngineandTransmission = value
    })
    this.vehicleConditionFormGroup.get('doesCarHaveMechanicalIssues')?.valueChanges.subscribe((value) => {
      this.vechileCondition.doesCarHaveMechanicalIssues = value
    })

    this.vehicleConditionFormGroup.get('mechanicalIssues')?.valueChanges.subscribe((mechanicalIssues: { [key: string]: boolean }) => {
      const selectedIssues = Object.keys(mechanicalIssues).filter(
        (key) =>  {
          return mechanicalIssues[key]
        }
      );

      selectedIssues.map((item:any) => {
        if(item === 'warningLights') {
          return this.mechanical.warningLights;
        }
        return item.toString;
      }) 
      console.log('selectedIssues',selectedIssues);
      this.vechileCondition.mechanicalIssues = selectedIssues.join();
      console.log('selectedIssues.join',this.vechileCondition.mechanicalIssues);
    });
    this.vehicleConditionFormGroup.statusChanges.subscribe(status => {
      if(status === 'VALID') {
        if(this.vechileCondition.doesCarHaveMechanicalIssues === true && this.vechileCondition.mechanicalIssues?.length === 0) {
          return;
        }else {
          this.stepTwoValidated.emit(true)
          this.reviewService.vehicleConditionPageStepper = true;
        }
      }else {
        this.stepTwoValidated.emit(false)
        this.reviewService.vehicleConditionPageStepper = false;
      }
      this.onSubmit();
    })
  }

  onSubmit() {
    if(this.vehicleConditionFormGroup.valid) {
      this.reviewService.vehicleConditionPageStepper = true;
      this.stepTwoValidated.emit(true)
    }else {
      this.reviewService.vehicleConditionPageStepper = false;
      this.stepTwoValidated.emit(false)
    }
  }
}
