import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-what-is-vin',
  templateUrl: './what-is-vin.component.html',
  styleUrls: ['./what-is-vin.component.css'],
})
export class WhatIsVinComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<WhatIsVinComponent>) {}
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  
}
