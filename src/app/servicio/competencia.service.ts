import { Injectable } from '@angular/core';
import {Competencia} from "../modelo/Competencia";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService extends GenericService<Competencia>{
  protected kr = new
  BehaviorSubject<Competencia[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/competencias`);
  }
  setCompetenciaChange(data: Competencia[]){
    this.kr.next(data);
  }
  getCompetenciaChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
