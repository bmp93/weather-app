import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  /** OpenWeatherMap api URL */
  private apiUrl: string;
  /** OpenWeatherMap api key */
  private apiKey: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiKey = 'c79e56552da4680cf521449bbe18e274';
    this.apiUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${this.apiKey}&q=`;
  }

  /**
   * Load weather detail from openweather api by location
   * @param location : City or state name
   */
  loadWeather(location: string) {
    return this.http.get(this.apiUrl + location);
  }

  /**
   * Load weather detail from localstorage
   * @param location : City or state name
   */
  // loadWeatherDetailFromLocal(location: string) {
  //   return of(JSON.parse(localStorage.getItem(location.toLowerCase().trim())));
  // }
}
