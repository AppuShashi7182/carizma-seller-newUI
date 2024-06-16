import { Component } from '@angular/core';
export interface ITestimonials {
  body: string,
  name: string;
}
@Component({
  selector: 'app-sell-car-home',
  templateUrl: './sell-car-home.component.html',
  styleUrls: ['./sell-car-home.component.css']
})
export class SellCarHomeComponent {
  testimonials: ITestimonials[] = [{ body: 'Smooth Experiance with Carizma with a satisfactory Deal', name: 'Jon Doe sold car ' }, { body: 'Smooth Experiance with Carizma with a satisfactory Deal', name: 'Jon Doe sold car ' }, { body: 'Smooth Experiance with Carizma with a satisfactory Deal', name: 'Jon Doe sold car ' }];
  constructor() {

  }


}
