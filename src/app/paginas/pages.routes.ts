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

export const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate:[certGuard] },


  { path: 'logro', component: MainLogroComponent , canActivate:[certGuard]},
  { path: 'nota', component: MainNotaComponent , canActivate:[certGuard]},
  { path: 'curso', component: MainCursoComponent , canActivate:[certGuard]},
  { path: 'competencia', component: MainCompetenciaComponent , canActivate:[certGuard]},
  { path: 'sede', component: MainSedeComponent , canActivate:[certGuard]},
  { path: 'institucion', component: MainInstitucionComponent , canActivate:[certGuard]},
  { path: 'comunicado', component: MainComunicadoComponent , canActivate:[certGuard]},
  { path: 'estudiante', component: MainEstudianteComponent , canActivate:[certGuard]},
  { path: 'apoderado', component: MainApoderadoComponent , canActivate:[certGuard]},
  { path: 'medio', component: MainMedioComponent , canActivate:[certGuard]},
  { path: 'periodo', component: MainPeriodoComponent , canActivate:[certGuard]},
  { path: 'trabajador', component: MainTrabajadorComponent , canActivate:[certGuard]},
  { path: 'nivel', component: MainNivelComponent , canActivate:[certGuard]},
  { path: 'seccion', component: MainSeccionComponent , canActivate:[certGuard]},
  { path: 'carga', component: MainCargaComponent , canActivate:[certGuard]},
  { path: 'plan', component: MainPlanComponent , canActivate:[certGuard]},
  { path: 'grupo', component: MainGrupoComponent , canActivate:[certGuard]},
  { path: 'matricula', component: MainMatriculaComponent , canActivate:[certGuard]},
  { path: 'insidencia', component: MainInsidenciaComponent , canActivate:[certGuard]},
  { path: 'estadotencia', component: MainEstadotenciaComponent , canActivate:[certGuard]},
  { path: 'asistencia', component: MainAsistenciaComponent , canActivate:[certGuard]},

  { path: 'not-403', component: Not403Component},

];
