import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  public IsMobileResolution: boolean;

  constructor() {
    //this.IsMobileResolution = /Android|iPhone/i.test(navigator.userAgent);

    this.detectResolution();
    window.addEventListener('resize', (e) => { this.detectResolution(); });
  }

  private detectResolution() {
    if (window.innerWidth < 1024) {
      this.IsMobileResolution = true;
    } 
    else {
      this.IsMobileResolution = false;
    }
  }
}
