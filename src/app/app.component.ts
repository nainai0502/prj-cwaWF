import { Component } from '@angular/core';
import { cwaWeekWF91Service } from './Services/cwa-week-wf-91.service';
import { Cities, CityBy7Days } from './Classes/city-by7-days';
import { CityBy36Hours } from './Classes/city-by36-hours';
import { CwaDayWF01Service } from './Services/cwa-day-wf-01.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  c7DaysweatherData: CityBy7Days[] | null = null;
  c36HoursweatherData: CityBy36Hours[] | null = null;
  cities = Cities;
  searchCity: string = '';
  constructor(
    private cwaWeekWF91service: cwaWeekWF91Service,
    private cwaDayWF01Service: CwaDayWF01Service
  ) {
    this.searchChanged('臺北市');
  }
  searchChanged(city: string) {
    this.cwaWeekWF91service.get7Days(city).subscribe((weekResult) => {
      //console.log(weekResult);
      this.c7DaysweatherData = weekResult;
    });
    this.cwaDayWF01Service.get36Hours(city).subscribe((dayResult) => {
      console.log(dayResult);
      this.c36HoursweatherData = dayResult;
      console.log(this.c36HoursweatherData[0].City);
    });
  }
}
