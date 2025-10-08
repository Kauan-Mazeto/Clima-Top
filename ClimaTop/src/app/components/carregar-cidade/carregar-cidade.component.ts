import { Component, input } from '@angular/core';
import { OpenWeatherService } from '../../services/open-weather.service';

@Component({
  selector: 'app-carregar-cidade',
  standalone: true,
  imports: [],
  providers: [OpenWeatherService],
  templateUrl: './carregar-cidade.component.html',
  styleUrls: ['./carregar-cidade.component.scss']
})
export class CarregarCidadeComponent {

  mensagem = input<string>("Carregando...");
}
