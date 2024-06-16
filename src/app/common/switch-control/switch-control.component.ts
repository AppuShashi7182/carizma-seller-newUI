import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch-control',
  templateUrl: './switch-control.component.html',
  styleUrls: ['./switch-control.component.css'],
})
export class SwitchControlComponent {
  @Input() count?: boolean;
  @Output() countChange = new EventEmitter<boolean>();
  constructor() {}

  onNativeChange(e: Event) {
    // here e is a native event
    if ((e.target as HTMLInputElement).checked) {
      // do something here
      this.count = !this.count;
    }
  }
}
