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

export const pagesRoutes: Routes = [
  {
    path: 'cargo',
    component: MainCargoComponent,
    children: [
      { path: 'new', component: FormCargoComponent },
      { path: 'edit/:id', component: FormCargoComponent },
    ],
  },
  {
    path: 'estudiante',
    component: MainEstudianteComponent,
    children: [
      { path: 'new', component: FormEstudianteComponent },
      { path: 'edit/:id', component: FormEstudianteComponent },
    ],
  },
  {
    path: 'insidencia',
    component: MainInsidenciaComponent,
    children: [
      { path: 'new', component: FormInsidenciaComponent },
      { path: 'edit/:id', component: FormInsidenciaComponent },
    ],
  },
  {
    path: 'mediointeres',
    component: MainMediointeresComponent,
    children: [
      { path: 'new', component: FormMediointeresComponent },
      { path: 'edit/:id', component: FormMediointeresComponent },
    ],
  },
  {
    path: 'trabajador',
    component: MainTrabajadorComponent,
    children: [
      { path: 'new', component: FormTrabajadorComponent },
      { path: 'edit/:id', component: FormTrabajadorComponent },
    ],
  },

];
