import { Component } from '@angular/core';
import { OpenWeatherService } from './Services/open-weather.service';
import { Cities, CityBy7Days } from './Services/city-by7-days';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  weatherData: CityBy7Days[] | null = null;
  cities = Cities;
  searchCity: string = '';
  constructor(private service: OpenWeatherService) {
    this.searchChanged('臺北市');
  }
  searchChanged(city: string) {
    this.service
      .get7Days(city)
      .subscribe((result) => (this.weatherData = result));
  }
}
