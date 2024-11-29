import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {certGuard} from "../guard/cert.guard";
import {Not403Component} from "./not403/not403.component";
import {MainLogroComponent} from "./main-logro/main-logro.component";
import {MainNotaComponent} from "./main-nota/main-nota.component";
import {MainCursoComponent} from "./main-curso/main-curso.component";
import {MainCompetenciaComponent} from "./main-competencia/main-competencia.component";
import {MainSedeComponent} from "./main-sede/main-sede.component";
import {MainInstitucionComponent} from "./main-institucion/main-institucion.component";
import {MainComunicadoComponent} from "./main-comunicado/main-comunicado.component";
import {MainEstudianteComponent} from "./main-estudiante/main-estudiante.component";
import {MainApoderadoComponent} from "./main-apoderado/main-apoderado.component";
import {MainMedioComponent} from "./main-medio/main-medio.component";
import {MainPeriodoComponent} from "./main-periodo/main-periodo.component";
import {MainTrabajadorComponent} from "./main-trabajador/main-trabajador.component";
import {MainNivelComponent} from "./main-nivel/main-nivel.component";
import {MainSeccionComponent} from "./main-seccion/main-seccion.component";
import {MainCargaComponent} from "./main-carga/main-carga.component";
import {MainPlanComponent} from "./main-plan/main-plan.component";
import {MainGrupoComponent} from "./main-grupo/main-grupo.component";
import {MainMatriculaComponent} from "./main-matricula/main-matricula.component";
import {MainInsidenciaComponent} from "./main-insidencia/main-insidencia.component";
import {MainEstadotenciaComponent} from "./main-estadotencia/main-estadotencia.component";
import {MainAsistenciaComponent} from "./main-asistencia/main-asistencia.component";
import {FormLogroComponent} from "./main-logro/form-logro/form-logro.component";
import {FormNotaComponent} from "./main-nota/form-nota/form-nota.component";
import {FormCursoComponent} from "./main-curso/form-curso/form-curso.component";
import {FormCompetenciaComponent} from "./main-competencia/form-competencia/form-competencia.component";
import {FormSedeComponent} from "./main-sede/form-sede/form-sede.component";
import {FormInstitucionComponent} from "./main-institucion/form-institucion/form-institucion.component";
import {FormComunicadoComponent} from "./main-comunicado/form-comunicado/form-comunicado.component";
import {FormEstudianteComponent} from "./main-estudiante/form-estudiante/form-estudiante.component";
import {FormApoderadoComponent} from "./main-apoderado/form-apoderado/form-apoderado.component";
import {FormMedioComponent} from "./main-medio/form-medio/form-medio.component";
import {FormPeriodoComponent} from "./main-periodo/form-periodo/form-periodo.component";
import {FormTrabajadorComponent} from "./main-trabajador/form-trabajador/form-trabajador.component";
import {FormNivelComponent} from "./main-nivel/form-nivel/form-nivel.component";
import {FormSeccionComponent} from "./main-seccion/form-seccion/form-seccion.component";
import {FormCargaComponent} from "./main-carga/form-carga/form-carga.component";
import {FormPlanComponent} from "./main-plan/form-plan/form-plan.component";
import {FormGrupoComponent} from "./main-grupo/form-grupo/form-grupo.component";
import {FormInsidenciaComponent} from "./main-insidencia/form-insidencia/form-insidencia.component";
import {FormEstadotenciaComponent} from "./main-estadotencia/form-estadotencia/form-estadotencia.component";
import {FormMatriculaComponent} from "./main-matricula/form-matricula/form-matricula.component";
import {FormAsistenciaComponent} from "./main-asistencia/form-asistencia/form-asistencia.component";

export const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate:[certGuard] },


  {
    path: 'logro',
    component: MainLogroComponent,
    children: [
      { path: 'new', component: FormLogroComponent },
      { path: 'edit/:id', component: FormLogroComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'nota',
    component: MainNotaComponent,
    children: [
      { path: 'new', component: FormNotaComponent },
      { path: 'edit/:id', component: FormNotaComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'curso',
    component: MainCursoComponent,
    children: [
      { path: 'new', component: FormCursoComponent },
      { path: 'edit/:id', component: FormCursoComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'competencia',
    component: MainCompetenciaComponent,
    children: [
      { path: 'new', component: FormCompetenciaComponent },
      { path: 'edit/:id', component: FormCompetenciaComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'sede',
    component: MainSedeComponent,
    children: [
      { path: 'new', component: FormSedeComponent },
      { path: 'edit/:id', component: FormSedeComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'institucion',
    component: MainInstitucionComponent,
    children: [
      { path: 'new', component: FormInstitucionComponent },
      { path: 'edit/:id', component: FormInstitucionComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'comunicado',
    component: MainComunicadoComponent,
    children: [
      { path: 'new', component: FormComunicadoComponent },
      { path: 'edit/:id', component: FormComunicadoComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'estudiante',
    component: MainEstudianteComponent,
    children: [
      { path: 'new', component: FormEstudianteComponent },
      { path: 'edit/:id', component: FormEstudianteComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'apoderado',
    component: MainApoderadoComponent,
    children: [
      { path: 'new', component: FormApoderadoComponent },
      { path: 'edit/:id', component: FormApoderadoComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'medio',
    component: MainMedioComponent,
    children: [
      { path: 'new', component: FormMedioComponent },
      { path: 'edit/:id', component: FormMedioComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'periodo',
    component: MainPeriodoComponent,
    children: [
      { path: 'new', component: FormPeriodoComponent },
      { path: 'edit/:id', component: FormPeriodoComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'trabajador',
    component: MainTrabajadorComponent,
    children: [
      { path: 'new', component: FormTrabajadorComponent },
      { path: 'edit/:id', component: FormTrabajadorComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'nivel',
    component: MainNivelComponent,
    children: [
      { path: 'new', component: FormNivelComponent },
      { path: 'edit/:id', component: FormNivelComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'seccion',
    component: MainSeccionComponent,
    children: [
      { path: 'new', component: FormSeccionComponent },
      { path: 'edit/:id', component: FormSeccionComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'carga',
    component: MainCargaComponent,
    children: [
      { path: 'new', component: FormCargaComponent },
      { path: 'edit/:id', component: FormCargaComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'plan',
    component: MainPlanComponent,
    children: [
      { path: 'new', component: FormPlanComponent },
      { path: 'edit/:id', component: FormPlanComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'grupo',
    component: MainGrupoComponent,
    children: [
      { path: 'new', component: FormGrupoComponent },
      { path: 'edit/:id', component: FormGrupoComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'matricula',
    component: MainMatriculaComponent,
    children: [
      { path: 'new', component: FormMatriculaComponent},
      { path: 'edit/:id', component: FormMatriculaComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'insidencia',
    component: MainInsidenciaComponent,
    children: [
      { path: 'new', component: FormInsidenciaComponent },
      { path: 'edit/:id', component: FormInsidenciaComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'estadotencia',
    component: MainEstadotenciaComponent,
    children: [
      { path: 'new', component: FormEstadotenciaComponent },
      { path: 'edit/:id', component: FormEstadotenciaComponent },
    ],  canActivate:[certGuard]
  },
  {
    path: 'asistencia',
    component: MainAsistenciaComponent,
    children: [
      { path: 'new', component: FormAsistenciaComponent },
      { path: 'edit/:id', component: FormAsistenciaComponent },
    ],  canActivate:[certGuard]
  },


  { path: 'not-403', component: Not403Component},

];
