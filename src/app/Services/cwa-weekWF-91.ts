import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityBy7Days } from './city-by7-days';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class cwaWeekWF91 {
  url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/';
  apiKey = 'CWA-AE5691B9-8AF5-49ED-9263-D311253874DE';
  constructor(private http: HttpClient) {}

  paddingLeft(str: string, length: number): string {
    //給與正確圖片編號
    if (str.length >= length) return str;
    else return this.paddingLeft('0' + str, length);
  }
  private getMinT(
    element: any,
    days: string[],
    cityBy7Days: CityBy7Days[],
    city: string
  ) {
    element.time.forEach((time: any) => {
      let day = time.startTime.toString().substr(0, 10);
      let timing = time.startTime.toString().substr(11, 10);
      let weekDay = days[new Date(day).getDay()];
      let c7days = cityBy7Days.find((c) => c.City == city && c.Date == day);

      if (!c7days) {
        c7days = new CityBy7Days(city, day, weekDay);
        cityBy7Days.push(c7days);
      }
      if (timing.substr(0, 2) == '06' || timing.substr(0, 2) == '12') {
        c7days.AMMinT = time.elementValue[0].value;
      }
      if (timing.substr(0, 2) == '18') {
        c7days.PMMinT = time.elementValue[0].value;
      }
    });
  }
  private getMaxT(
    element: any,
    days: string[],
    cityBy7Days: CityBy7Days[],
    city: any
  ) {
    element.time.forEach((time: any) => {
      let day = time.startTime.toString().substr(0, 10);
      let timing = time.startTime.toString().substr(11, 10);
      let weekDay = days[new Date(day).getDay()];
      let c7days = cityBy7Days.find((c) => c.Date == day);
      if (!c7days) {
        c7days = new CityBy7Days(city, day, weekDay);
        cityBy7Days.push(c7days);
      }
      if (timing.substr(0, 2) == '06' || timing.substr(0, 2) == '12') {
        c7days.AMMaxT = time.elementValue[0].value;
      }
      if (timing.substr(0, 2) == '18') {
        c7days.PMMaxT = time.elementValue[0].value;
      }
    });
  }
  private getWx(
    element: any,
    days: string[],
    cityBy7Days: CityBy7Days[],
    city: any
  ) {
    let wxBaseURL =
      'https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/';
    element.time.forEach((time: any) => {
      let day = time.startTime.toString().substr(0, 10);
      let timing = time.startTime.toString().substr(11);
      let weekDay = days[new Date(day).getDay()];
      let c7days = cityBy7Days.find((c) => c.City == city && c.Date == day);
      if (!c7days) {
        c7days = new CityBy7Days(city, day, weekDay);
        cityBy7Days.push(c7days);
      }
      let v1 = time.elementValue[0].value;
      if (timing.substr(0, 2) == '06' || timing.substr(0, 2) == '12') {
        let v2 =
          wxBaseURL +
          'day/' +
          this.paddingLeft(time.elementValue[1].value, 2) +
          '.svg';
        c7days.AMWX = v1;
        c7days.AMWXValue = v2;
      }
      if (timing.substr(0, 2) == '18') {
        c7days.PMWX = v1;
        let v2 =
          wxBaseURL +
          'night/' +
          this.paddingLeft(time.elementValue[1].value, 2) +
          '.svg';
        c7days.PMWXValue = v2;
      }
    });
  }
  get7Days(city: string) {
    let cityBy7Days: CityBy7Days[] = [];
    let url = `${this.url}F-D0047-091?Authorization=${this.apiKey}&locationName=${city}&elementName=MinT,MaxT,Wx`;
    return this.http.get(url).pipe(
      map((result) => {
        return this.mapToCityBy7Days(cityBy7Days, result);
      })
    );
  }
  mapToCityBy7Days(cityBy7Days: CityBy7Days[], result: any) {
    let days: string[] = ['日', '一', '二', '三', '四', '五', '六'];
    let location = (result as any).records.locations[0].location;

    location.forEach((location: any) => {
      let city = location.locationName;
      console.log(city);
      let weatherElement = location.weatherElement;
      weatherElement.forEach((element: any) => {
        switch (element.elementName) {
          case 'MinT':
            this.getMinT(element, days, cityBy7Days, city);
            break;
          case 'MaxT':
            this.getMaxT(element, days, cityBy7Days, city);
            break;
          case 'Wx':
            this.getWx(element, days, cityBy7Days, city);
            break;
        }
      });
    });
    // return cityBy7Days;
    // 篩選出當天之後 5 天的資料
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    return cityBy7Days.filter((item) => item.Date > today).slice(0, 5);
  }
}
