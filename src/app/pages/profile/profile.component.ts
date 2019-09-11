import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(userFormData: any) {
    this.usuario.nombre = userFormData.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = userFormData.email;
    }

    this.usuarioService.actualizarUsuario( this.usuario )
              .subscribe();
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      return;
    }

    if ( archivo.type.indexOf('image') < 0  ) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;

    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

  cambiarImagen() {
    this.usuarioService.cambiarImage( this.imagenSubir, this.usuario._id );
  }

}
