import { Injectable } from '@angular/core';
import {Estadotencia} from "../modelo/Estadotencia";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EstadotenciaService extends GenericService<Estadotencia>{
  protected kr = new
  BehaviorSubject<Estadotencia[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/estadotencias`);
  }
  setEstadotenciaChange(data: Estadotencia[]){
    this.kr.next(data);
  }
  getEstadotenciaChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
