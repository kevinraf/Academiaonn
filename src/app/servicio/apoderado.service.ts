import { Injectable } from '@angular/core';
import {Apoderado} from "../modelo/Apoderado";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService extends GenericService<Apoderado>{
  protected kr = new
  BehaviorSubject<Apoderado[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/apoderados`);
  }
  setApoderadoChange(data: Apoderado[]){
    this.kr.next(data);
  }
  getApoderadoChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
