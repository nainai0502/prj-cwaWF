import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CityBy36Hours } from '../Classes/city-by36-hours';

@Injectable({
  providedIn: 'root',
})
export class CwaDayWF01Service {
  url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/';
  apiKey = 'CWA-AE5691B9-8AF5-49ED-9263-D311253874DE';
  constructor(private http: HttpClient) {}

  paddingLeft(str: string, length: number): string {
    //給與正確圖片編號
    if (str.length >= length) return str;
    else return this.paddingLeft('0' + str, length);
  }
  private getMinT(element: any, cityBy36hours: CityBy36Hours[], city: string) {
    const timeData = element.time[0];
    const day = timeData.startTime.toString().substr(0, 10);
    let c36hours = cityBy36hours.find((c) => c.City == city && c.Date == day);

    if (!c36hours) {
      c36hours = new CityBy36Hours(city, day);
      cityBy36hours.push(c36hours);
    }
    c36hours.currMinT = timeData.parameter.parameterName;
  }
  private getMaxT(element: any, cityBy36hours: CityBy36Hours[], city: any) {
    const timeData = element.time[0];
    const day = timeData.startTime.toString().substr(0, 10);
    let c36hours = cityBy36hours.find((c) => c.City == city && c.Date == day);

    if (!c36hours) {
      c36hours = new CityBy36Hours(city, day);
      cityBy36hours.push(c36hours);
    }
    c36hours.currMaxT = timeData.parameter.parameterName;
  }
  private getPoP(element: any, cityBy36hours: CityBy36Hours[], city: any) {
    const timeData = element.time[0];
    const day = timeData.startTime.toString().substr(0, 10);
    let c36hours = cityBy36hours.find((c) => c.City == city && c.Date == day);

    if (!c36hours) {
      c36hours = new CityBy36Hours(city, day);
      cityBy36hours.push(c36hours);
    }
    c36hours.currPoP = timeData.parameter.parameterName;
  }
  private getWx(element: any, cityBy36hours: CityBy36Hours[], city: any) {
    let wxBaseURL =
      'https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/';
    const timeData = element.time[0];
    const day = timeData.startTime.toString().substr(0, 10);
    let c36hours = cityBy36hours.find((c) => c.City == city && c.Date == day);
    if (!c36hours) {
      c36hours = new CityBy36Hours(city, day);
      cityBy36hours.push(c36hours);
    }
    let v1 = timeData.parameter.parameterName;
    let v2 =
      wxBaseURL +
      'day/' +
      this.paddingLeft(timeData.parameter.parameterValue, 2) +
      '.svg';
    c36hours.currWX = v1;
    c36hours.currWXValue = v2;
  }
  get36Hours(city: string) {
    let cityBy36Hours: CityBy36Hours[] = [];
    let url = `${this.url}F-C0032-001?Authorization=${this.apiKey}&locationName=${city}&elementName=Wx,PoP,MinT,MaxT`;
    return this.http.get(url).pipe(
      map((result) => {
        //console.log(result);
        return this.mapToCityBy36Hours(cityBy36Hours, result);
      })
    );
  }
  mapToCityBy36Hours(cityBy36Hours: CityBy36Hours[], result: any) {
    let location = (result as any).records.location[0];
    console.log(location);
    location.weatherElement.forEach((element: any) => {
      let city = location.locationName;
      switch (element.elementName) {
        case 'MinT':
          console.log('跑來MinT這');
          this.getMinT(element, cityBy36Hours, city);
          break;
        case 'MaxT':
          console.log('跑來MaxT這');
          this.getMaxT(element, cityBy36Hours, city);
          break;
        case 'Wx':
          console.log('跑來Wx這');
          this.getWx(element, cityBy36Hours, city);
          break;
        case 'PoP':
          console.log('跑來PoP這');
          this.getPoP(element, cityBy36Hours, city);
          break;
      }
    });
    return cityBy36Hours;
  }
}
