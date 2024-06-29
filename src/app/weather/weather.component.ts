import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  url = `https://api.tomorrow.io/v4/weather/forecast?&units=metric&apikey=${environment.apiKey}&location=`;
  options = {
      method: "GET",
  };
  location = '';
  weatherData:any;
  hourlyData:any;

  constructor() {
  }

  async testAPI() {
    const response = await fetch(this.url+this.location, this.options);
    const result = await response.json();
    console.log(result);
    this.weatherData = result;
    console.log(this.weatherData);
  }

  getWeatherCode() {
    let url = "/tomorrow-weather-codes-master/V2_icons/large/png/";
    url += this.weatherData.timelines.daily[0].values.weatherCodeMin + "0.png";
    return url;
  }

  getSmallWeatherCode(index:number) {
    let url = "/tomorrow-weather-codes-master/V2_icons/small/png/";
    url += this.hourlyData[index].values.weatherCode + "0.png";
    return url;
  }

  getImportantHours() {
    this.hourlyData = []; 
    for(var i = 1; i < 13; i++) {
      this.hourlyData.push(this.weatherData.timelines.hourly[i]);
    }
    return this.hourlyData;
  }

  getCityName() {
    if(this.weatherData.location.name) {
      return this.weatherData.location.name.split(",")[0] + ",";
    }
    else
      return "Latitude: "+this.weatherData.location.lat +"°, ";
  }

  getCountryName() {
    if(this.weatherData.location.name) {
      let nameArr = this.weatherData.location.name.split(",");
      return nameArr[nameArr.length-1];
    }
    else
      return "Longitude: "+this.weatherData.location.lon + "°";
  }
}
