import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;

  medico: Medico;


  constructor(
    public medicoService: MedicoService,
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }


  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos( this.desde )
          .subscribe( (resp: any) => {
            this.medicos = resp;
            this.total = this.medicoService.totalMedicos;
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
    this.cargarMedicos();

  }

  obtenerMedico( id: string) {
    this.cargando = true;
    this.medicoService.obtenerMedico( id )
              .subscribe( (resp: any) => {
                this.medico = resp;
                this.cargando = false;
              });

  }

  buscarMedico( termino: string) {
    if (!termino) {
      return;
    }
    if (termino.length < 3) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this.medicoService.buscarMedico( termino )
              .subscribe( (medicos: Medico[]) => {

                this.medicos = medicos;
                this.cargando = false;
              });
  }

  borrarMedico( medico: Medico ) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar a: ' + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'No, cancela',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this.medicoService.borrarMedico( medico._id )
              .subscribe( (resp: any) => {
                this.cargarMedicos();

                console.log('resp: ', resp);

                if (resp.ok) {
                  swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    `El médico ${medico.nombre} ha sido eliminado`,
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

  guardarMedico( medico: Medico ) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de modifica a: ' + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, modificalo',
      cancelButtonText: 'No, cancela',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this.medicoService.actualizarMedico( medico )
              .subscribe( (resp: any) => {
                this.cargarMedicos();
                if (resp) {
                  swalWithBootstrapButtons.fire(
                    'Modificado!',
                    `El médico ${medico.nombre} ha sido modificado`,
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


