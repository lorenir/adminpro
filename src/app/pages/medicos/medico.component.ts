import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];

  medico: Medico = new Medico('', '', null, '');

  hospital: Hospital = new Hospital('');


  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
      activatedRoute.params.subscribe( params => {
        const id = params.id;
        if ( id !== 'nuevo' ) {
          this.cargarMedico(id);
        }
      });
  }

  ngOnInit() {

    this.hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales);

    this.modalUploadService.notificacion
          .subscribe( (resp: any) => {
            this.medico.img = resp.medico.img;
          })
  }

  guardar(medicoFormData: any) {
    this.medico.nombre = medicoFormData.nombre;
    this.medico.hospital = medicoFormData.hospital;

    this.medicoService.actualizarMedico( this.medico )
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
    // this.usuarioService.cambiarImage( this.imagenSubir, this.usuario._id );
  }

  guardarMedico(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    const accion = this.medico._id ? 'modificado' : 'creado';
    
 
    this.medicoService.guardarMedico (this.medico )
          .subscribe(medico => {

            this.medico = medico;
            Swal.fire(
              `Médico ${accion}!`,
              `El médico ${medico.nombre} ha sido ${accion}`,
              'success'
              );

            this.router.navigate(['/medico', medico._id]);

          });


  }

  cambiarHospital( id: string ) {

    this.hospitalService.obtenerHospital( id )
        .subscribe( hospital => this.hospital = hospital);

  }


  cargarMedico( id: string) {
    this.medicoService.cargarMedico( id )
              .subscribe( medico => {

                this.medico = medico;
                this.medico.hospital = medico.hospital._id;
                this.medico.usuario = medico.usuario._id;
                this.cambiarHospital( this.medico.hospital);

              });

  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);

  }


}
