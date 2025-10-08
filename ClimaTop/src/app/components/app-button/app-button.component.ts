import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-app-button',
  imports: [],
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent { 


  onClick = output<void>();
}
