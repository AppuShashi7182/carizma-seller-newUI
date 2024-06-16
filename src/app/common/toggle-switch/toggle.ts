import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'toggle-button',
  template: `
    <input type="checkbox" id="toggle-button-checkbox" />
    <span (click)="toggle()">
      <label class="toggle-button-switch" for="toggle-button-checkbox"></label>
      <div class="toggle-button-text">
        <div class="toggle-button-text-on">YES</div>
        <div class="toggle-button-text-off">NO</div>
      </div>
    </span>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        width: 100px;
        height: 20px;
      }

      input[type='checkbox'] {
        display: none;
      }

      /* 토글 버튼 내부의 원. 감춘 체크박스와 연동한다. */
      .toggle-button-switch {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 46px;
        height: 46px;
        background-color: #fff;
        border-radius: 100%;
        cursor: pointer;
        z-index: 100;
        transition: left 0.3s;
      }

      .toggle-button-text {
        overflow: hidden;
        background-color: #fc3164;
        border-radius: 25px;
        box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
        transition: background-color 0.3s;
      }

      .toggle-button-text-on,
      .toggle-button-text-off {
        float: left;
        width: 50%;
        height: 100%;
        line-height: 50px;
        font-family: Lato, sans-serif;
        font-weight: bold;
        color: #fff;
        text-align: center;
      }

      input[type='checkbox']:checked ~ .toggle-button-switch {
        left: 52px;
      }

      input[type='checkbox']:checked ~ .toggle-button-text {
        background-color: #3dbf87;
      }
    `,
  ],
})
export class ToggleButtonComponent {
  // @Output() changed = new EventEmitter<boolean>();

  @Input() inputValue?: boolean;
  @Output() countChange = new EventEmitter<boolean>();
  constructor() {}

  onNativeChange(e: Event) {
    // here e is a native event
    if ((e.target as HTMLInputElement).checked) {
      // do something here
      this.inputValue = !this.inputValue;
    }
  }

  toggle() {
    // here e is a native event
    // if ((e.target as HTMLInputElement).checked) {
    //   // do something here
    this.inputValue = !this.inputValue;
    // }
  }
}
