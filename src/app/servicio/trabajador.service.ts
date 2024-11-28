import { Injectable } from '@angular/core';
import {Trabajador} from "../modelo/Trabajador";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService extends GenericService<Trabajador>{
  protected kr = new
  BehaviorSubject<Trabajador[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/trabajadores`);
  }
  setCategoriaChange(data: Trabajador[]){
    this.kr.next(data);
  }
  getCategoriaChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
