import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NomeCidadeComponent } from "../nome-cidade/nome-cidade.component";
import { TemperaturaCidadeComponent } from "../temperatura-cidade/temperatura-cidade.component";
import { ClimaCidadeComponent } from "../clima-cidade/clima-cidade.component";
import { MinmaxCidadeComponent } from "../minmax-cidade/minmax-cidade.component";
import { CarregarCidadeComponent } from "../carregar-cidade/carregar-cidade.component";
import { WeatherResponse } from '../../models/wheater-response.model';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { OpenWeatherService } from '../../services/open-weather.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-clima-container',
  standalone: true,
  imports: [DecimalPipe, NomeCidadeComponent, TemperaturaCidadeComponent, ClimaCidadeComponent, MinmaxCidadeComponent, CarregarCidadeComponent],
  templateUrl: './clima-container.component.html',
  styleUrls: ['./clima-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppClimaContainerComponent {

  mensagemCarregando: string = 'Carregando temperatura'
  openWeather = inject(OpenWeatherService);

  dadosClima = toSignal<WeatherResponse | null>(
    this.openWeather.buscarInfoClimaCidadeAtual()
    .pipe(
      catchError(err => {
        console.error('Erro ao buscar dados do clima', err);
        return of(null);
      })
    ),
    {initialValue: null}
  );
}