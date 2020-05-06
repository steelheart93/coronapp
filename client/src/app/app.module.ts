import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CifrasComponent } from './components/cifras/cifras.component';
import { DatosComponent } from './components/datos/datos.component';
import { ChartsComponent } from './components/charts/charts.component';

import { GenericService } from './services/generic.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CifrasComponent,
    DatosComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
