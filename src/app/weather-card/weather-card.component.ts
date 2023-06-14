import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from './weather.service';
import { interval, timer } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { UtilityService } from '../shared/service/utility.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  providers: [WeatherService]
})
export class WeatherCardComponent implements OnInit {
  /** used to display error message  */
  public message: string = '';

  /** Instance of formGroup to get user input */
  public weatherSearchForm: FormGroup;

  /** Stores weather details of searched location */
  public weatherDetail: any;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private utilityService: UtilityService
  ) { 
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  ngOnInit() {
  }

  getWeatherDetail() {
    this.loadWeatherDetailFromServer();
  }

  loadWeatherDetailFromServer() {
    /** timer : use to send 1st request without delay & then start polling by interval of 3 minute  */
    timer(0, 3000)
      .pipe(
        /** Cancels the previous request and make only one subscription active */
        switchMap(() => this.weatherService.loadWeather(this.weatherSearchForm.value.location))
      )
      .subscribe((result) => {
        if (!result) {
          this.message = 'No Record Found';
          this.weatherDetail = null;
          return;
        }
        this.weatherDetail = result;
        this.message = '';
      }, (error) => {
        /** check internet connection is available or not */
        const status = this.utilityService.getNetworkStatus();
        if (!status) {
          this.message = '“You are Offline”, cached data not available.';
          this.weatherDetail = null;
          return;
        }
        this.message = error.error.message;
      });
  }

  onEdit() {
    this.weatherDetail = null;
  }
}
