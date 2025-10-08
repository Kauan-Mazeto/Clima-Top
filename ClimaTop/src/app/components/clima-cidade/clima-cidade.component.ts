import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Weather } from '../../models/wheater-response.model';

@Component({
  selector: 'app-clima-cidade',
  standalone: true,
  imports: [TitleCasePipe],
  providers: [],
  templateUrl: './clima-cidade.component.html',
  styleUrls: ['./clima-cidade.component.scss']
})
export class ClimaCidadeComponent {

  clima = input<Weather | null>(null);

}
