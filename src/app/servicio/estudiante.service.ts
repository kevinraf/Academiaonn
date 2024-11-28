import { Injectable } from '@angular/core';
import {Estudiante} from "../modelo/Estudiante";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EstudianteService extends GenericService<Estudiante>{
  protected kr = new
  BehaviorSubject<Estudiante[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/estudiantes`);
  }
  setEstudianteChange(data: Estudiante[]){
    this.kr.next(data);
  }
  getEstudianteChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
