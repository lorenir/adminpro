import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise ( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      
      // Difinir los hooks para cuando pase algo con la llamada AJAX
      xhr.onreadystatechange = () => {
        
        if ( xhr.readyState === 4) {
          if ( xhr.status === 200 ) {
            console.log('Imagen subida' );
            resolve( JSON.parse( xhr.response));
          } else {
            console.log('Falló la subida');
            reject(xhr.response);
          }
        }
      };

      // haciendo la llamada AJAX
      
      formData.append( 'imagen', archivo, archivo.name);
      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });


  }
}
