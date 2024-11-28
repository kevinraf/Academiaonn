import { Injectable } from '@angular/core';
import {Medio} from "../modelo/Medio";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class MedioService extends GenericService<Medio>{
  protected kr = new
  BehaviorSubject<Medio[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/medios`);
  }
  setMedioChange(data: Medio[]){
    this.kr.next(data);
  }
  getMedioChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
