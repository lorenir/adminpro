import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.cargarAjustes( );
  }

  getTema(): string {
    return this.ajustes.tema;
  }

  setTema(tema: string) {
    this.ajustes.tema = tema;
  }

  getTemaUrl(): string {
    return this.ajustes.temaUrl;
  }

  setTemaUrl(temaUrl: string) {
    this.ajustes.temaUrl = temaUrl;
  }

  guardarAjustes(){
    console.log('Guardando en LocalStorage')
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if (localStorage.getItem('ajustes')) {
      console.log('Cargando del LocalStorage');
      this.ajustes = JSON.parse( localStorage.getItem('ajustes'));

    } else {
      console.log('Usando valores por defecto');
    }

    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema: string){
    const urlTema: string = `assets/css/colors/${tema}.css`;

    this.document.getElementById('tema').setAttribute('href', urlTema);

    this.ajustes.temaUrl = urlTema;
    this.ajustes.tema = tema;

    this.guardarAjustes();

  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
