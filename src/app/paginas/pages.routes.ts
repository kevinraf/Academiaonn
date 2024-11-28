import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {certGuard} from "../guard/cert.guard";
import {Not403Component} from "./not403/not403.component";

export const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate:[certGuard] },

  { path: 'not-403', component: Not403Component},

];
