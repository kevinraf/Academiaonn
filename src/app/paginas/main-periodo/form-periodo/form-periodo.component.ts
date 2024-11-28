import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Periodo} from "../../../modelo/Periodo";
import {PeriodoService} from "../../../servicio/periodo.service";

@Component({
  selector: 'app-form-periodo',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './form-periodo.component.html',
  styleUrl: './form-periodo.component.css'
})
export class FormPeriodoComponent implements OnInit {
  @ViewChild('PeriodoForm') PeriodoForm!: NgForm ;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Periodo,
    private krService: PeriodoService,
    private _dialogRef: MatDialogRef<FormPeriodoComponent>
  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombrePeriodo']);

      this.form = new FormGroup({
        idPeriodo: new FormControl(this.data['idPeriodo']),
        nombrePeriodo: new FormControl(this.data['nombrePeriodo'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }else{
      this.form = new FormGroup({
        idPeriodo: new FormControl(0),
        nombrePeriodo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    const kr: Periodo = new Periodo();
    kr.idPeriodo = this.form.value['idPeriodo'];
    kr.nombrePeriodo = this.form.value['nombrePeriodo'];

    if(this.PeriodoForm.valid){
      if(kr.idPeriodo > 0){
        //UPDATE
        this.krService.update(kr.idPeriodo, kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setPeriodoChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });
      }else{
        //INSERT
        this.krService.save(kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setPeriodoChange(data);
            this.krService.setMessageChange('CREATED!');
            this.close();
          });
      }
    }else{
      console.log("Error....")
    }
  }
  get f(){
    return this.form.controls;
  }
}
