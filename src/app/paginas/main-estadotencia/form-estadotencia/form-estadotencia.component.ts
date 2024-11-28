import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Estadotencia} from "../../../modelo/Estadotencia";
import {EstadotenciaService} from "../../../servicio/estadotencia.service";

@Component({
  selector: 'app-form-estadotencia',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './form-estadotencia.component.html',
  styleUrl: './form-estadotencia.component.css'
})
export class FormEstadotenciaComponent implements OnInit {
  @ViewChild('EstadotenciaForm') EstadotenciaForm!: NgForm ;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Estadotencia,
    private krService: EstadotenciaService,
    private _dialogRef: MatDialogRef<FormEstadotenciaComponent>
  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombre']);

      this.form = new FormGroup({
        idEstadotencia: new FormControl(this.data['idEstadotencia']),
        nombre: new FormControl(this.data['nombre'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }else{
      this.form = new FormGroup({
        idEstadotencia: new FormControl(0),
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    const kr: Estadotencia = new Estadotencia();
    kr.idEstadotencia = this.form.value['idEstadotencia'];
    kr.nombre = this.form.value['nombre'];

    if(this.EstadotenciaForm.valid){
      if(kr.idEstadotencia > 0){
        //UPDATE
        this.krService.update(kr.idEstadotencia, kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setEstadotenciaChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });
      }else{
        //INSERT
        this.krService.save(kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setEstadotenciaChange(data);
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
