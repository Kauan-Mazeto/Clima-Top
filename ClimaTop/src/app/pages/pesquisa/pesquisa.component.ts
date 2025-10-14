import { Component, signal } from '@angular/core';
import {  AppClimaContainerComponent } from "../../components/clima-container/clima-container.component";

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss'],
  imports: [AppClimaContainerComponent]
})
export class PesquisaComponent {

  constructor() { }

  cidadePesquisada = signal('Dois Vizinhos')

  pesquisar(nomeCidade: string) {
    if (nomeCidade.trim()) {
      this.cidadePesquisada.set(nomeCidade.trim());
      alert('Cidade pesquisada: ' + this.cidadePesquisada());
    }
  }
}
