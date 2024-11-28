import { Injectable } from '@angular/core';
import {Carga} from "../modelo/Carga";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CargaService extends GenericService<Carga>{
  protected kr = new
  BehaviorSubject<Carga[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/cargas`);
  }
  setCargaChange(data: Carga[]){
    this.kr.next(data);
  }
  getCargaChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
