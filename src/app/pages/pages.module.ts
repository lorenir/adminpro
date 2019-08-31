import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { FormsModule } from '@angular/forms';

//MODULOS
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.modules';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { GraficaDonutComponent } from '../components/grafica-donut/grafica-donut.component';


@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule,
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaDonutComponent
    ],
    providers: [],
})
export class PagesModule { }
