import { Injectable } from '@angular/core';
import {Logro} from "../modelo/Logro";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class LogroService extends GenericService<Logro>{
  protected kr = new
  BehaviorSubject<Logro[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/logros`);
  }
  setLogroChange(data: Logro[]){
    this.kr.next(data);
  }
  getLogroChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
