import { Component } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { UtilityService } from './shared/service/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';
  /** array of random number */
  public numbers: Array<number> = [];

  /** Panel to display */
  public numberOfPanels: number;

  public online$: Observable<boolean>;

  /** Flag to check online/offline state */
  public isOnline: boolean;

  constructor(
    private utilityService: UtilityService
  ) {
    this.isOnline = false;

    this.numberOfPanels = 9;
    /** array of 9 random number to display panel */
    this.numbers = Array(this.numberOfPanels).fill(0).map((x, i) => i);

    /** Check network status by using window events */
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    this.networkStatus();
  }

  /**
   * Subscribe to network status and set to service
   */
  public networkStatus() {
    this.online$.subscribe((value: any) => {
      if (!value) {
        alert('“You are Offline”, we might want to load cached data if available.');
      }
      this.isOnline = value;
      this.utilityService.setNetworkStatus(value);
    })
  }

  /** Invoked On change of number of panel */
  resetPanels() {
    /** in case of 0 or empty number of panel set to 1 */
    if (!this.numberOfPanels) {
      this.numberOfPanels = 1;
    }
    this.numbers = Array(this.numberOfPanels).fill(0).map((x, i) => i);
  }
}
