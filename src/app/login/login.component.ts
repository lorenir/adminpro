import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {

  public recuerdame: boolean = false;
  public email: string;

  public auth2: any;

  constructor(
    private ngZone: NgZone,
    public router: Router,
    public usuarioService: UsuarioService) {

  }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 2 ) {
      this.recuerdame = true;
    }

  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '211801276626-jlcqrg85h4j57u2er2teka79v0nnumfq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });
  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle( token )
              .subscribe( () => window.location.href = '#/dashboard');
            // .subscribe(() => this.ngZone.run(() => this.router.navigate(['/dashboard']))); // workaround para evitar warning ngZone
    });
  }

  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password );

    this.usuarioService.login(usuario, forma.value.recuerdame)
            .subscribe( correcto => this.router.navigate(['/dashboard']));
  }

}
