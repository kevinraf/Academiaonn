import { Injectable } from '@angular/core';
import {Institucion} from "../modelo/Institucion";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class InstitucionService extends GenericService<Institucion>{
  protected kr = new
  BehaviorSubject<Institucion[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/instituciones`);
  }
  setInstitucionChange(data: Institucion[]){
    this.kr.next(data);
  }
  getInstitucionChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
