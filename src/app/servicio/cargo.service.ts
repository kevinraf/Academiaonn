import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

import {Cargo} from "../modelo/Cargo";
@Injectable({
  providedIn: 'root'
})
export class CargoService extends GenericService<Cargo>{

  protected krubject = new
  BehaviorSubject<Cargo[]>([]);
  private messageChange: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/cargos`);
  }
  setCargoChange(data: Cargo[]){
    this.krubject.next(data);
  }
  getCargoChange(){
    return this.krubject.asObservable();
  }
  setMessageChange(data: string){
    this.messageChange.next(data);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }

}
