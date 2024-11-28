import { Injectable } from '@angular/core';
import {Periodo} from "../modelo/Periodo";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PeriodoService extends GenericService<Periodo>{
  protected kr = new
  BehaviorSubject<Periodo[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/periodos`);
  }
  setPeriodoChange(data: Periodo[]){
    this.kr.next(data);
  }
  getPeriodoChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
