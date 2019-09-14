import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../service.index';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public usuarioService: UsuarioService,
    public subirArchivoService: SubirArchivoService
  ) { }

  getAutenticatedUserToken(): string {
    return this.usuarioService.token;
  }

  cargarHospitales(desde: number = 0){
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url )
        .pipe(map ((resp: any ) => {
          this.totalHospitales = resp.total;
          return resp.hospitales;
        }));
  }

  obtenerHospital( id: string ){
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
    .pipe(map ((resp: any ) => resp.hospital ));
  }

  borrarHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.getAutenticatedUserToken();

    return this.http.delete(url);

  }

  crearHospital( hospital: Hospital) {

    const url = URL_SERVICIOS + '/hospital/' + '?token=' + this.getAutenticatedUserToken();

    return this.http.post<any>( url , hospital)
      .pipe(map (resp => {
        // Swal.fire('Usuario creado', hospital.nombre, 'success');
        return resp.hospital;

      }));

  }

  buscarHospital( termino: string ){
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
            .pipe(map( (resp: any) =>  resp.hospitales));
  }

  actualizarHospital( hospital: Hospital) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.getAutenticatedUserToken();

    return this.http.put<any>( url , hospital)
    .pipe(map (resp => resp.hospital));
  }

}
