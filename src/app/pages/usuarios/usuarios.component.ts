import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;

  constructor( public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios( );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {
                this.usuarios = resp.usuarios;
                this.total = resp.total;
                this.cargando = false;
              });

  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    console.log( desde );

    if ( desde >= this.total ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();


  }

  buscarUsuario( termino: string) {
    if (!termino) {
      return;
    }
    if (termino.length < 3) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario( termino )
              .subscribe( (usuarios: Usuario[]) => {

                this.usuarios = usuarios;
                this.cargando = false;
              });
  }
}
