import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

//MODULOS
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.modules';

@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component],
    providers: [],
})
export class PagesModule { }
