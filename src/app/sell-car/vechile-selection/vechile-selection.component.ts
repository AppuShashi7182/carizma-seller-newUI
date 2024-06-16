import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of, startWith } from 'rxjs';
import { VechileYears } from 'src/app/constants.ts/constants';
import { IMake } from 'src/app/models/IState';
import { IVechileModelDetails } from 'src/app/models/IVechile';
import { SellCarStoreService } from 'src/app/services/SellCarStore.Service';
import { NHTSAService } from 'src/app/services/nhtsa-service';

@Component({
  selector: 'app-vechile-selection',
  templateUrl: './vechile-selection.component.html',
  styleUrls: ['./vechile-selection.component.css'],
})
export class VechileSelectionComponent {
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  VechileRegisterationList: Number[];
  isLoading: boolean = false;
  makelistControl = new FormControl();
  modelControl = new FormControl();
  selectedTrim = new FormControl();
  makes: groupMakesData[] = [];
  model: string[] = [];

  makesList: Observable<groupMakesData[]>;
  modelList: Observable<string[]>;
  trimList: Observable<string[]>;

  manualVechileSelectionForm: FormGroup;

  modelDetails = { make: '', year: '',model:'',trim:''};
  constructor(
    private _service: NHTSAService,
    public _store: SellCarStoreService,
    public router: Router,
    private toaster: ToastrService,
  ) {
    let vehicleYears= VechileYears.sort(function(a:any,b:any){return b-a});
    this.VechileRegisterationList = vehicleYears;
    this.makesList = of([]);
    this.modelList = of([]);
    this.trimList = of([]);
    this.manualVechileSelectionForm = new FormGroup({
      year: new FormControl('', Validators.required),
      make:  new FormControl('', Validators.required),
      trim:  new FormControl('', Validators.required),
      model:  new FormControl('', Validators.required),
    });
  }
  get yearSelected() {
    return this.manualVechileSelectionForm.get('yearSelected');
  }
  yearSelectionChange(e: any) {
    console.log(this.modelDetails,this.manualVechileSelectionForm,'this.modelDetails')

    this.yearSelected?.setValue(e?.value, {
      emitEvent: true,
    });
    this.makesList = of([]);
    this.makelistControl.setValue('');
    this.modelControl.setValue('');
    // this.makesList =
    this._service
      .getAllMakes(this.manualVechileSelectionForm.value.yearSelected ?? 1990)
      .subscribe((s) => {
        this.makes = this.groupBy(s);

        this.makesList = this.makelistControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
    this.modelList = of([]);
    this.trimList = of([]);
  }

  groupBy(list: IMake[]): groupMakesData[] {
    let groupData: groupMakesData[] = [];

    groupData.push({
      groupName: 'Popular',
      makes: list.filter((s) => s.isPopuplarmake == 'Y').map((s) => s.make),
    } as groupMakesData);
    groupData.push({
      groupName: 'All Makes',
      makes: list.filter((s) => s.isPopuplarmake == 'N').map((s) => s.make),
    } as groupMakesData);

    return groupData;
  }

  // groupBy(list: any[], key: string): Map<string, Array<any>> {
  //   let map = new Map();
  //   list.map((val) => {
  //     if (!map.has(val[key])) {
  //       map.set(
  //         val[key],
  //         list.filter((data) => data[key] == val[key])
  //       );
  //     }
  //   });
  //   return map;
  // }

  makeSelectionChange(event: any) {
    this.modelControl.setValue('');
    this.trimList = of([]);
    console.log(this.makelistControl.value,this.modelDetails,this.modelDetails.make,'this.makelistControl.value',event)
    // this.manualVechileSelectionForm.controls['selectedMake'].setValue(this.makelistControl.value)
    this._service
      .getModel(
        Number(this.modelDetails.year),
        this.modelDetails.make ?? 'TOYOTA'
      )
      .subscribe((s) => {
        this.model = s;
        this.modelList = this.modelControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterModel(value))
        );
        console.log(this.modelList)
      });
  }

  modelSelectionChange(e: any) {
    // this.manualVechileSelectionForm.controls['selectedModel'].setValue(this.modelControl.value)
    console.log(this.manualVechileSelectionForm)
    this.trimList = this._service.getTrim(
      Number(this.modelDetails.year) ?? 1990,
      this.modelDetails.make ?? 'TOYOTA',
      this.modelDetails.model ??
      'COROLLA'
    );
  }

  trimSelectionChange() { }

  onSubmit(): void {
    this.manualVechileSelectionForm.markAllAsTouched();
    if (this.manualVechileSelectionForm.valid) {
    this.isLoading = true;
    // setTimeout(() => (this.isLoading = false), 10000);

    let carSelection = new IVechileModelDetails();
    carSelection.make = this.modelDetails.make;
    carSelection.model = this.modelDetails.model;
    carSelection.trim = this.modelDetails.trim;
    carSelection.year = Number(this.modelDetails.year);

    carSelection.plateNumber = '';
    carSelection.state = '';
    carSelection.vin = '';
    //     year?: Number;
    // make?: string;
    // model?: string;
    // trim?: string;
    // vin?: string;
    // plateNumber?: string;
    // state?: string;
    this._store.setCurrentSellVechileDetails(carSelection)
    this.router.navigate(['/questionaire']);
  }
  }
  getErrorMessage() {
    let invalid: boolean = true;
    if (this.yearSelected?.invalid) {
      // this.toaster.error('Please Select Year', 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
      return invalid;
    } else if (this.makelistControl.invalid) {
      // this.toaster.error('Please Select Make', 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
      return invalid;

    } else if (this.modelControl.invalid) {
      // this.toaster.error('Please Select Model', 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
      return invalid;
    } else if (this.selectedTrim.invalid) {
      // this.toaster.error('Please Select Trim', 'Error', { timeOut: 4000, positionClass: 'toast-top-center', closeButton: true })
      return invalid;
    } else {
      return false;
    }
  }

  validateTextField(event: any, field: string) {
    if (field === 'Make') {
      this.makes.map((group) => {
        if (
          group.makes.some(
            (item) =>
              this.makelistControl.value.toLowerCase() === item.toLowerCase()
          )
        ) {
          return;
        } else {
          this.makelistControl.setValue('');
          this.modelControl.setValue('');
        }
      });
    }
  }

  private _filter(value: string): groupMakesData[] {
    const filterValue = value.toLowerCase();

    return this.makes
      .map((group) => ({
        groupName: group.groupName,
        makes: group.makes.filter((make) =>
          make
        ),
      }))
      .filter((group) => group.makes.length > 0);
  }

  private _filterModel(value: string): string[] {
    const filterValue = value.toLowerCase();
    return filterValue == ''
      ? this.model
      : this.model?.filter((option) =>
        option
      );
  }
}

export class groupMakesData {
  groupName!: string;
  makes!: string[];
}
