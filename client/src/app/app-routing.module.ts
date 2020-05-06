import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CifrasComponent } from './components/cifras/cifras.component';
import { ChartsComponent } from './components/charts/charts.component';
import { DatosComponent } from './components/datos/datos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cifras',
    pathMatch: 'full'
  },
  {
    path: 'cifras',
    component: CifrasComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'datos',
    component: DatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
