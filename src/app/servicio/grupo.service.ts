import { Injectable } from '@angular/core';
import {Grupo} from "../modelo/Grupo";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends GenericService<Grupo>{
  protected kr = new
  BehaviorSubject<Grupo[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/grupos`);
  }
  setGrupoChange(data: Grupo[]){
    this.kr.next(data);
  }
  getGrupoChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
