import { Injectable } from '@angular/core';
import {Seccion} from "../modelo/Seccion";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SeccionService extends GenericService<Seccion>{
  protected kr = new
  BehaviorSubject<Seccion[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/secciones`);
  }
  setSeccionChange(data: Seccion[]){
    this.kr.next(data);
  }
  getSeccionChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
