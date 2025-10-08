import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { WeatherResponse } from '../../models/wheater-response.model';
import { catchError, of } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { NomeCidadeComponent } from "../../components/nome-cidade/nome-cidade.component";
import { TemperaturaCidadeComponent } from "../../components/temperatura-cidade/temperatura-cidade.component";
import { CarregarCidadeComponent } from "../../components/carregar-cidade/carregar-cidade.component";
import { OpenWeatherService } from '../../services/open-weather.service';
import { ClimaCidadeComponent } from "../../components/clima-cidade/clima-cidade.component";
import { MinmaxCidadeComponent } from "../../components/minmax-cidade/minmax-cidade.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";


@Component({
  selector: 'app-clima',
  standalone: true,
  templateUrl: './clima.component.html',
  imports: [DecimalPipe, NomeCidadeComponent, TemperaturaCidadeComponent, CarregarCidadeComponent, ClimaCidadeComponent, MinmaxCidadeComponent, AppButtonComponent],
  styleUrls: ['./clima.component.scss']
})

export class ClimaComponent {

  navegador = inject(Router);
  openWeatherService: OpenWeatherService = inject(OpenWeatherService);
  dadosClima = toSignal<WeatherResponse | null>(
    this.openWeatherService.buscarInfoClimaCidadeAtual()
    .pipe(
      catchError(err => {
        console.error('Erro ao buscar dados do clima:', err);
        return of(null);
      })
    ),
    { initialValue: null }
  );

  mensagemCarregando = "Carregando Temperatura...";

  constructor() { }

  navegarParaTeladePesquisa() {
    this.navegador.navigate(['/pesquisa']);
    this.mensagemCarregando = "Carregando Temperatura...";
  }


}

