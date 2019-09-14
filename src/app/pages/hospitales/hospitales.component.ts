import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;

  hospital: Hospital;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.notificacion
        .subscribe( resp => this.cargarHospitales() );
  }


  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales( this.desde )
              .subscribe( (resp: any) => {
                this.hospitales = resp;
                this.total = this.hospitalService.totalHospitales;
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
    this.cargarHospitales();

  }

  mostrarModal( id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);

  }

  obtenerHospital( id: string) {
    this.cargando = true;
    this.hospitalService.obtenerHospital( id )
              .subscribe( (resp: any) => {
                this.hospital = resp;
                this.cargando = false;
              });

  }

  buscarHospital( termino: string) {
    if (!termino) {
      return;
    }
    if (termino.length < 3) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospital( termino )
              .subscribe( (hospitales: Hospital[]) => {

                this.hospitales = hospitales;
                this.cargando = false;
              });
  }

  borrarHospital( hospital: Hospital ) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar a: ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'No, cancela',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this.hospitalService.borrarHospital( hospital._id )
              .subscribe( (resp: any) => {
                this.cargarHospitales();

                console.log('resp: ', resp);

                if (resp.ok) {
                  swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    `El hospital ${hospital.nombre} ha sido eliminado`,
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

  guardarHospital( hospital: Hospital ) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de modifica a: ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, modificalo',
      cancelButtonText: 'No, cancela',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this.hospitalService.actualizarHospital( hospital )
              .subscribe( (resp: any) => {
                this.cargarHospitales();
                if (resp) {
                  swalWithBootstrapButtons.fire(
                    'Modificado!',
                    `El hospital ${hospital.nombre} ha sido modificado`,
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

  async crearHospital() {

    const { value: nombreHospital } = await Swal.fire({
      title: 'Introduzca el nombre del hospital',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'El nombre del hospital es requerido';
        }
      }
    });

    if (nombreHospital) {
      const hospital: Hospital = new Hospital(nombreHospital);

      this.hospitalService.crearHospital( hospital )
      .subscribe( (resp: any) => {
        this.cargarHospitales();
        if (resp) {
          Swal.fire(`Creado el Hospital ${nombreHospital}`);
        } else {
            Swal.fire(
              'No se ha podido crear el hospital!',
              'Algo ha fallado en el servidor',
              'error');
        }
      }, (error: any) => {
            Swal.fire('No se ha podido crear el hospital!',
            'Algo ha fallado en el servidor',
            'error');

        }
    );

    }
  }

}

