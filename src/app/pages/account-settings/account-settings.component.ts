import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document,
               public ajustesService: SettingsService) {


  }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColorTema( tema: string, linkName: any ) {
    this.aplicarCheck(linkName);

    this.ajustesService.aplicarTema(tema);
  }

  aplicarCheck(linkName: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores){
      ref.classList.remove('working');
    }

    linkName.classList.add('working');

  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');

    const tema = this.ajustesService.getTema();

    for (const ref of selectores){
      if ( ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
