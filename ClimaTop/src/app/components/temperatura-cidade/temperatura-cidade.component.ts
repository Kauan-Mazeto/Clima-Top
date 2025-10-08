import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-temperatura-cidade',
  standalone: true,
  imports: [],
  templateUrl: './temperatura-cidade.component.html',
  styleUrls: ['./temperatura-cidade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperaturaCidadeComponent { }
