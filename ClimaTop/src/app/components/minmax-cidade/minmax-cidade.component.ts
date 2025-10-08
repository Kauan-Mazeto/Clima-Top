import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Main } from '../../models/wheater-response.model'; 

@Component({
  selector: 'app-minmax-cidade',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './minmax-cidade.component.html',
  styleUrls: ['./minmax-cidade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MinmaxCidadeComponent { 

  main = input<Main | null>(null);
}