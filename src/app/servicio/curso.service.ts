import { Injectable } from '@angular/core';
import {Curso} from "../modelo/Curso";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CursoService extends GenericService<Curso>{
  protected kr = new
  BehaviorSubject<Curso[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/cursos`);
  }
  setCursoChange(data: Curso[]){
    this.kr.next(data);
  }
  getCursoChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
