import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrentDayWFComponent } from './current-day-wf/current-day-wf.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';

@NgModule({
  declarations: [AppComponent, CurrentDayWFComponent, WeatherCardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
