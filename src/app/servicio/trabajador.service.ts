import { Injectable } from '@angular/core';
import {Trabajador} from "../modelo/Trabajador";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService extends GenericService<Trabajador> {

  protected krubject = new
  BehaviorSubject<Trabajador[]>([]);
  private messageChange: Subject<string> = new
  Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/trabajadores`);
  }
  setTrabajadorChange(data: Trabajador[]){
    this.krubject.next(data);
  }
  getTrabajadorChange(){
    return this.krubject.asObservable();
  }
  setMessageChange(data: string){
    this.messageChange.next(data);
  }
  getMessageChange(){
    return this.messageChange.asObservable();
  }


}
