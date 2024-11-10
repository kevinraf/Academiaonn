import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {MedioInteres} from "../modelo/MedioInteres";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class MedioInteresService extends GenericService<MedioInteres>{


  protected krubject = new
  BehaviorSubject<MedioInteres[]>([]);
  private messageChange: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/mediointereses`);
  }
  setMedioInteresChange(data: MedioInteres[]){
    this.krubject.next(data);
  }
  getMedioInteresChange(){
    return this.krubject.asObservable();
  }
  setMessageChange(data: string){
    this.messageChange.next(data);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }


}
