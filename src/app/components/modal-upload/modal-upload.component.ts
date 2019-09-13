import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {
   }

  ngOnInit() {
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


  subirImagen(){
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
        .then( resp => {

          console.log(resp);
          this.modalUploadService.notificacion.emit( resp );
          this.cerrarModal();


        })
        .catch ( err => {
          console.log('Error en la carga...');
        });
  }

  cerrarModal() {
    this.imagenSubir =  null;
    this.imagenTemp = null;
    this.modalUploadService.ocultarModal();
  }

}
