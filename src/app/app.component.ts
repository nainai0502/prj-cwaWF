import { Component } from '@angular/core';
import { cwaWeekWF91 } from './Services/cwa-weekWF-91';
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
  constructor(private service: cwaWeekWF91) {
    this.searchChanged('臺北市');
  }
  searchChanged(city: string) {
    this.service.get7Days(city).subscribe((result) => {
      console.log(result);
      this.weatherData = result;
    });
  }
}
