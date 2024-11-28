import { Injectable } from '@angular/core';
import {Asistencia} from "../modelo/Asistencia";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService extends GenericService<Asistencia>{
  protected kr = new
  BehaviorSubject<Asistencia[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/asistencias`);
  }
  setAsistenciaChange(data: Asistencia[]){
    this.kr.next(data);
  }
  getAsistenciaChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
