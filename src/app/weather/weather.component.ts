import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  url = "https://api.tomorrow.io/v4/weather/forecast?&units=metric&apikey=1r3pRoUDMmhBtVFCrbVj8At5birHxd3D&location=";
  options = {
      method: "GET",
  };
  location = '';
  weatherData:any;
  currentWeatherCode:any;

  constructor() {
  }

  async testAPI() {
    const response = await fetch(this.url+this.location, this.options);
    const result = await response.json();
    console.log(result.timelines.daily);
    this.weatherData = result;
    console.log(this.weatherData);
    this.getWeatherCode();
  }

  getWeatherCode() {
    this.currentWeatherCode = this.weatherData.timelines.daily[0].weatherCodeMin;
  }

  getImportantHours() {
    let hourlyData = []; 
    for(var i = 1; i < 13; i++) {
      hourlyData.push(this.weatherData.timelines.hourly[i]);
    }
    return hourlyData;
  }
}
