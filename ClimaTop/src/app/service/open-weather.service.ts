import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  apiKey = 'f39c61444538bcb34a7be173ade7f6ee';  
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  constructor() { }

  buscarInfoClimaCidadeAtual () {

    const urlCompleta = this.apiUrl + '?q=Dois%20Vizinhos&appid=' + this.apiKey + '&lang=pt_br&units=metrics';
    console.log(urlCompleta);
  }
}

//https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f39c61444538bcb34a7be173ade7f6ee
//https://api.openweathermap.org/data/2.5/weather?q=Dois%20Vizinhos&appid=f39c61444538bcb34a7be173ade7f6ee&lang=pt_br&units=metrics