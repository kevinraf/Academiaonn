import { Injectable } from '@angular/core';
import {Plan} from "../modelo/Plan";
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PlanService extends GenericService<Plan>{
  protected kr = new
  BehaviorSubject<Plan[]>([]);
  private krr: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/planes`);
  }
  setPlanChange(data: Plan[]){
    this.kr.next(data);
  }
  getPlanChange(){
    return this.kr.asObservable();
  }
  setMessageChange(data: string){
    this.krr.next(data);
  }
  getMessageChange(){
    return this.krr.asObservable();
  }

}
