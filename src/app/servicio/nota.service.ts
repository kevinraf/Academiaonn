import { Injectable } from '@angular/core';
import {Nota} from "../modelo/Nota";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class NotaService extends GenericService<Nota>{
  protected kr = new
  BehaviorSubject<Nota[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/notas`);
  }
  setNotaChange(data: Nota[]){
    this.kr.next(data);
  }
  getNotaChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
