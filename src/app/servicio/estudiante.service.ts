import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {Estudiante} from "../modelo/Estudiante";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EstudianteService extends GenericService<Estudiante>{
  protected krubject = new
  BehaviorSubject<Estudiante[]>([]);
  private messageChange: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/estudiantes`);
  }
  setEstudianteChange(data: Estudiante[]){
    this.krubject.next(data);
  }
  getEstudianteChange(){
    return this.krubject.asObservable();
  }
  setMessageChange(data: string){
    this.messageChange.next(data);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
