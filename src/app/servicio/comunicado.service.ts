import { Injectable } from '@angular/core';
import {Comunicado} from "../modelo/Comunicado";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService extends GenericService<Comunicado>{
  protected kr = new
  BehaviorSubject<Comunicado[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/comunicados`);
  }
  setComunicadoChange(data: Comunicado[]){
    this.kr.next(data);
  }
  getComunicadoChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
