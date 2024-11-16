import { Routes } from '@angular/router';
import {MainCargoComponent} from "./main-cargo/main-cargo.component";
import {FormCargoComponent} from "./main-cargo/form-cargo/form-cargo.component";
import {MainEstudianteComponent} from "./main-estudiante/main-estudiante.component";
import {MainInsidenciaComponent} from "./main-insidencia/main-insidencia.component";
import {MainMediointeresComponent} from "./main-mediointeres/main-mediointeres.component";
import {MainTrabajadorComponent} from "./main-trabajador/main-trabajador.component";
import {FormTrabajadorComponent} from "./main-trabajador/form-trabajador/form-trabajador.component";
import {FormMediointeresComponent} from "./main-mediointeres/form-mediointeres/form-mediointeres.component";
import {FormInsidenciaComponent} from "./main-insidencia/form-insidencia/form-insidencia.component";
import {FormEstudianteComponent} from "./main-estudiante/form-estudiante/form-estudiante.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {certGuard} from "../guard/cert.guard";
import {Not403Component} from "./not403/not403.component";

export const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate:[certGuard] },
  {
    path: 'cargo',
    component: MainCargoComponent,
    children: [
      { path: 'new', component: FormCargoComponent },
      { path: 'edit/:id', component: FormCargoComponent },
    ], canActivate:[certGuard]
  },
  {
    path: 'estudiante',
    component: MainEstudianteComponent,
    children: [
      { path: 'new', component: FormEstudianteComponent },
      { path: 'edit/:id', component: FormEstudianteComponent },
    ], canActivate:[certGuard]
  },
  {
    path: 'insidencia',
    component: MainInsidenciaComponent,
    children: [
      { path: 'new', component: FormInsidenciaComponent },
      { path: 'edit/:id', component: FormInsidenciaComponent },
    ], canActivate:[certGuard]
  },
  {
    path: 'mediointeres',
    component: MainMediointeresComponent,
    children: [
      { path: 'new', component: FormMediointeresComponent },
      { path: 'edit/:id', component: FormMediointeresComponent },
    ], canActivate:[certGuard]
  },
  {
    path: 'trabajador',
    component: MainTrabajadorComponent,
    children: [
      { path: 'new', component: FormTrabajadorComponent },
      { path: 'edit/:id', component: FormTrabajadorComponent },
    ], canActivate:[certGuard]
  },
  { path: 'not-403', component: Not403Component},

];
