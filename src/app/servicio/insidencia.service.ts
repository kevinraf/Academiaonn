import { Injectable } from '@angular/core';
import {Insidencia} from "../modelo/Insidencia";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class InsidenciaService extends GenericService<Insidencia>{
  protected kr = new
  BehaviorSubject<Insidencia[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/insidencias`);
  }
  setInsidenciaChange(data: Insidencia[]){
    this.kr.next(data);
  }
  getInsidenciaChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
