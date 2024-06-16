import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {

  constructor(private router: Router) { }

  navigate(route:string) {
    if(this.router.url?.split('/').includes('questionaire') && route === 'terms-and-conditions'){
      window.open('https://www.carizma.com/terms-and-conditions', '_blank');
      return;
    }
    this.router.navigate([`/${route}`]);
  }
}
