import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private isNetworkAvailable: boolean;

  constructor() {
    this.isNetworkAvailable = false;
  }

  setNetworkStatus(status: boolean) {
    this.isNetworkAvailable = status;
  }

  getNetworkStatus() {
    return this.isNetworkAvailable;
  }
}
