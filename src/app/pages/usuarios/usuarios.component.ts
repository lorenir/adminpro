import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

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

  borrarUsuario( usuario: Usuario ) {
    
    if ( usuario._id === this.usuarioService.usuario._id ){
      Swal.fire('No puede borrar el usuario', 'No se puede borrar el usuario actualmente autenticado', 'error');
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar a: ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'No, cancela',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this.usuarioService.borrarUsuario( usuario._id )
              .subscribe( (resp: any) => {
                this.cargarUsuarios();

                console.log('resp: ', resp);

                if (resp.ok) {
                  swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    `El usuario ${usuario.nombre} ha sido eliminado`,
                    'success'
                    );
                } else {
                  swalWithBootstrapButtons.fire(
                    'No se ha podido eliminar!',
                    'Algo ha fallado en el servidor',
                    'error'
                    );
                }
              }, (error: any) => {
                  swalWithBootstrapButtons.fire(
                    'No se ha podido eliminar!',
                    'Algo ha fallado en el servidor',
                    'error'
                    );
                }
            );
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {

    // if ( usuario._id === this.usuarioService.usuario._id ){
    //   Swal.fire('No puede borrar el usuario', 'No se puede borrar el usuario actualmente autenticado', 'error');
    //   return;
    // }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de modifica a: ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, modificalo',
      cancelButtonText: 'No, cancela',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this.usuarioService.actualizarUsuario( usuario )
              .subscribe( (resp: any) => {
                this.cargarUsuarios();
                if (resp) {
                  swalWithBootstrapButtons.fire(
                    'Modificado!',
                    `El usuario ${usuario.nombre} ha sido modificado`,
                    'success'
                    );
                } else {
                  swalWithBootstrapButtons.fire(
                    'No se ha podido modificar!',
                    'Algo ha fallado en el servidor',
                    'error'
                    );
                }
              }, (error: any) => {
                  swalWithBootstrapButtons.fire(
                    'No se ha podido modificar!',
                    'Algo ha fallado en el servidor',
                    'error'
                    );
                }
            );
      }
    });
  }

}
