import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  private isMobileResolution: boolean;

  constructor() {
    this.isMobileResolution = /Android|iPhone/i.test(navigator.userAgent);
    // if (window.innerWidth < 768) {
    //   this.isMobileResolution = true;
    // } 
    // else {
    //   this.isMobileResolution = false;
    // }
  }

  public get IsMobileResolution(): boolean { return this.isMobileResolution; }
}
