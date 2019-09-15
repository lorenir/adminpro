import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public usuarioService: UsuarioService
  ) { }

  getAutenticatedUserToken(): string {
    return this.usuarioService.token;
  }

  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get( url )
        .pipe(map ((resp: any ) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        }));
  }

  cargarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
        .pipe(map ((resp: any ) => resp.medico));
  }

  obtenerMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
    .pipe(map ((resp: any ) => resp.medico ));
  }

  borrarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this.getAutenticatedUserToken();

    return this.http.delete(url);

  }

  crearMedico( medico: Medico) {

    const url = URL_SERVICIOS + '/medico/' + '?token=' + this.getAutenticatedUserToken();

    return this.http.post<any>( url , medico)
      .pipe(map (resp => {
        return resp.medico;

      }));

  }

  buscarMedico( termino: string ){
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url )
            .pipe(map( (resp: any) =>  resp.medicos));
  }

  actualizarMedico( medico: Medico) {

    const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this.getAutenticatedUserToken();

    return this.http.put<any>( url , medico)
    .pipe(map (resp => resp.medico));
  }

  guardarMedico( medico: Medico) {

    if ( medico._id ) {
      return this.actualizarMedico(medico);
    } else{
      return this.crearMedico( medico );

    }

  }

}
