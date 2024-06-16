import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  public sendEvent(eventName: string, eventParams: object = {}): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventParams);
    } else {
      console.warn('Google Analytics is not initialized');
    }
  }
}
