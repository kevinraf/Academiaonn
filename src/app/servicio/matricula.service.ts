import { Injectable } from '@angular/core';
import {Matricula} from "../modelo/Matricula";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class MatriculaService extends GenericService<Matricula>{
  protected kr = new
  BehaviorSubject<Matricula[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/matriculas`);
  }
  setMatriculaChange(data: Matricula[]){
    this.kr.next(data);
  }
  getMatriculaChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
