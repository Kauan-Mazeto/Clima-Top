import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../models/wheater-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {


  private apiKey = 'f39c61444538bcb34a7be173ade7f6ee';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private http = inject(HttpClient);
  
  constructor() { }

  buscarInfoClimaCidadeAtual (): Observable<WeatherResponse> {

    const urlCompleta = this.apiUrl + '?q=Dois%20Vizinhos&appid=' + this.apiKey + '&lang=pt_br&units=metrics';
    console.log(urlCompleta);

    return this.http.get<WeatherResponse>(urlCompleta);
  }
}

//https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f39c61444538bcb34a7be173ade7f6ee
//https://api.openweathermap.org/data/2.5/weather?q=Dois%20Vizinhos&appid=f39c61444538bcb34a7be173ade7f6ee&lang=pt_br&units=metrics