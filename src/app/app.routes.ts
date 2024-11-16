import { Routes } from '@angular/router';
import {LoginComponent} from "./paginas/login/login.component";
import {LayoutComponent} from "./paginas/layout/layout.component";
import {Not404Component} from "./paginas/not404/not404.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () => import('./paginas/pages.routes').then(x => x.pagesRoutes)
  },
  { path: '**', component: Not404Component},

];
