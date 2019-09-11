import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string , tipo: string = 'usuarios'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ){
      return url + '/usuario/xxx';  // el servicio envia el noimage
    }

    if ( img.indexOf('google') >= 0) {  //  es una imagen de google
      return img;
    }

    switch ( tipo ) {
      case 'usuarios':
        url += '/usuarios/' + img;
        console.log(url);
        break;

      case 'medicos':
        url += '/medicos/' + img;
        break;

      case 'hospitales':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('tipo de imagen invalido', tipo);
        url += '/usuario/xxx';
    }

    return url;
  }

}
