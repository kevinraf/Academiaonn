import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {Insidencia} from "../modelo/Insidencia";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class InsidenciaService extends GenericService<Insidencia>{
  protected krubject = new
  BehaviorSubject<Insidencia[]>([]);
  private messageChange: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/insidencias`);
  }
  setInsidenciaChange(data: Insidencia[]){
    this.krubject.next(data);
  }
  getInsidenciaChange(){
    return this.krubject.asObservable();
  }
  setMessageChange(data: string){
    this.messageChange.next(data);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
