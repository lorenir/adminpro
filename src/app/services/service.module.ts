import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { SettingsService,
          SidebarService,
          SharedService,
          UsuarioService,
          LoginGuard
} from './service.index';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    MedicoService,
    LoginGuard,
    ModalUploadService
  ],
})

export class ServiceModule { }
