import { Injectable } from '@angular/core';
import {Nivel} from "../modelo/Nivel";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class NivelService extends GenericService<Nivel>{
  protected kr = new
  BehaviorSubject<Nivel[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/niveles`);
  }
  setNivelChange(data: Nivel[]){
    this.kr.next(data);
  }
  getNivelChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
