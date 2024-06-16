import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-switch-html',
  templateUrl: './switch-html.component.html',
  styleUrls: ['./switch-html.component.css']
})
export class SwitchHtmlComponent {
  @Output() switchValue = new EventEmitter<boolean>();
  @Input() switchData : boolean  = false

  
  ngOnChanges(change: SimpleChange) {
    this.switchData = change.currentValue
  }
  onSearchChange(event: any) {
    this.switchData = event.id == "yes"?true:false
    
    console.log(event)
    this.switchValue.emit(this.switchData);
  }

  getId(){
    return this.switchData == true? "yes" : "no";
  }
}
