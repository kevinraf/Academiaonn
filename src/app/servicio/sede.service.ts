import { Injectable } from '@angular/core';
import {Sede} from "../modelo/Sede";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SedeService extends GenericService<Sede>{
  protected kr = new
  BehaviorSubject<Sede[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/sedes`);
  }
  setSedeChange(data: Sede[]){
    this.kr.next(data);
  }
  getSedeChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
