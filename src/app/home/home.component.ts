import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { NHTSAService } from '../services/nhtsa-service';
import { AlertService } from '../services/alert.service';
import { ToastrService } from 'ngx-toastr';

export interface ITestimonials {
  body: string,
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideIn1', [
      state('void', style({
        transform: 'translateX(100%)',
      })),
      state('*', style({
        transform: 'translateX(100)',
      })),
      transition('void => *', animate('600ms ease-out')),
    ]),
    trigger('slideIn2', [
      state('void', style({
        transform: 'translateX(100%)',
      })),
      state('*', style({
        transform: 'translateX(100)',
      })),
      transition('void => *', animate('1200ms ease-out')),
    ]),
    trigger('slideIn3', [
      state('void', style({
        transform: 'translateX(100%)',
      })),
      state('*', style({
        transform: 'translateX(100)',
      })),
      transition('void => *', animate('1800ms ease-out')),
    ]),
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX({{ CarCarousalDirection }}%)' }),
        animate('600ms ease-in-out')
      ])
    ])
  ],
})
export class HomeComponent {
  currentCarouselCarIndex = 0;
  CarCarousalDirection = 0; // Initial direction

  currentCarouselTestimonialIndex = 0;
  CarouselTestimonialDirection = 0;
  CarouselNationWideDirection = 0;
  currentNationWideIndex=0;
  interval: any;
  animationState = 'void';
  nationWideServices=['../../../assets/images/nationWideServices2.png','../../../assets/images/nationWideServices3.png','../../../assets/images/nationWideServices5.png','../../../assets/images/nationWideServices6.png']
  showImage1: boolean = false;
  showImage2: boolean = false;;
  showImage3: boolean = false;;
  isLoading:boolean=false;
  contactDetails:any={};
  public innerWidth: any;
  public mobileView = false;
  constructor(private router: Router, private _nhtsaervice: NHTSAService ,public alertService: AlertService,
    private toaster: ToastrService,) {}
  
  ngOnInit() {
    this.startCarCarousel();
    this.startTestimonialCarousel();
    this.startNationWideCarousel();
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<700){
      this.mobileView = true;
    }
    console.log(this.innerWidth,'this.innerWidth')
  }
  testimonials = [
    { author: 'Rosemary',designation:'Design consultant',img:'assets/img/testimonials/testimonials-1.jpg',text: 'My encounter with Carizma during the sale of my vehicle was flawless. Their offer surpassed others. The agent was punctual, friendly, and thorough in explaining paperwork. Afterward, I received my check and my car was transported.' },
    { author: 'Ethel Johnston',designation:'Human Directives Director',img:'assets/img/testimonials/testimonials-2.jpg',text: 'Efficient, fair, and friendly - the perfect place to sell!' },
    { author: 'Jennifer',designation:'Designer',img:'assets/img/testimonials/testimonials-3.jpg',text: 'Outstanding car-buying experience, excellent service, and unbeatable deals. Highly recommend!' },
    { author: 'John',designation:'Managing Director',img:'assets/img/testimonials/testimonials-4.jpg',text: 'My encounter with Carizma during the sale of my vehicle was flawless and smooth.' },
    { author: 'William',designation:'Software Engineer',img:'assets/img/testimonials/testimonials-5.jpg',text: 'The offer of Carizma surpassed others. The agent was very punctual and friendly, thorough in explaining paperwork.' },
  ];
  startCarCarousel() {
    setInterval(() => {
      this.next();
    }, 2000); // Adjust the interval as needed
  }
  startTestimonialCarousel() {
    setInterval(() => {
      this.nextTestimonial();
    }, 4000); // Adjust the interval as needed
  }
  startNationWideCarousel() {
    setInterval(() => {
      this.nextNationWideImage();
    }, 4000); // Adjust the interval as needed
  }
  images = [
    'assets/img/home-carosoul-1.png',
    'assets/img/home-carosoul-2.png',
    'assets/img/home-carosoul-3.png'
  ];
  next() {
    this.CarCarousalDirection = -100;
    this.currentCarouselCarIndex = (this.currentCarouselCarIndex + 1) % this.images.length;
  }
  @HostListener('window:scroll', [])


  showDistance(){
    window.open(`http://maps.google.com/?q=13935 Lynmar Blvd Tampa, FL 33626`, '_blank');
  }

  nextTestimonial() {
    this.CarouselTestimonialDirection= -100; // Slide to the left
    this.currentCarouselTestimonialIndex = (this.currentCarouselTestimonialIndex + 1) % this.testimonials.length;
  }
  prevTestimonial() {
    this.CarouselTestimonialDirection= 100; 
    this.currentCarouselTestimonialIndex = (this.currentCarouselTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
  nextNationWideImage() {
    this.CarouselNationWideDirection= -100; // Slide to the left
    this.currentNationWideIndex = (this.currentNationWideIndex + 1) % this.nationWideServices.length;
  }
  prevNationWideImage() {
    this.CarouselNationWideDirection= 100; 
    this.currentNationWideIndex = (this.currentNationWideIndex - 1 + this.nationWideServices.length) % this.nationWideServices.length;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Adjust this value based on when you want the animation to start
    const triggerPosition = 200;
    console.log(scrollPosition,'scrollPosition')
    // Adjust these values according to where you want the images to appear
    if (scrollPosition < 750) {
      this.showImage1 = true;
      this.showImage2 = false;
      this.showImage3 = false;
      // Set other image variables accordingly
    } else if (scrollPosition >= 750 && scrollPosition < 1000) {
      this.showImage1 = false;
      this.showImage2 = true;
      this.showImage3 = false;
      // Set other image variables accordingly
    } else {
      // Hide all images beyond this point
      this.showImage1 = false;
      this.showImage2 = false;
      this.showImage3 = true;
      // Set other image variables accordingly
    }
    if (scrollPosition > triggerPosition) {
      this.animationState = '*';
    } else {
      this.animationState = 'void';
    }
  }

  navigate(route:string) {
    this.router.navigate([`/${route}`]);
  }

  submitContactDetails(){
    this.isLoading = true;

    this._nhtsaervice.submitUserDetails(this.contactDetails).subscribe(
      (response)=>{
        alert('Details Submitted successfully');
      },(error)=>{
        console.error('Error');
      }
    )
  }

}
