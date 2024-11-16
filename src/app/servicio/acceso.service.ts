import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Acceso } from '../modelo/Acceso';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccesoService extends GenericService<Acceso> {
  private accesoChange = new Subject<Acceso[]>();
  constructor(http: HttpClient) {
  super(http,`${environment.HOST}/accesos`);
  }

  getAccesosByUser(username: string){
  return this.http.post<Acceso[]>(`${this.url}/user`, username);
  }


  getAccesosChange(){return this.accesoChange.asObservable(); }
  setAccesosChange(menus: Acceso[]){ this.accesoChange.next(menus);}
 }

