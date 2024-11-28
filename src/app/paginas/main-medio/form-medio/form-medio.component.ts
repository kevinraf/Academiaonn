import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Medio} from "../../../modelo/Medio";
import {MedioService} from "../../../servicio/medio.service";

@Component({
  selector: 'app-form-medio',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './form-medio.component.html',
  styleUrl: './form-medio.component.css'
})
export class FormMedioComponent implements OnInit {
  @ViewChild('MedioForm') MedioForm!: NgForm ;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medio,
    private krService: MedioService,
    private _dialogRef: MatDialogRef<FormMedioComponent>
  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombreMedio']);

      this.form = new FormGroup({
        idMedio: new FormControl(this.data['idMedio']),
        nombreMedio: new FormControl(this.data['nombreMedio'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }else{
      this.form = new FormGroup({
        idMedio: new FormControl(0),
        nombreMedio: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    const kr: Medio = new Medio();
    kr.idMedio = this.form.value['idMedio'];
    kr.nombreMedio = this.form.value['nombreMedio'];

    if(this.MedioForm.valid){
      if(kr.idMedio > 0){
        //UPDATE
        this.krService.update(kr.idMedio, kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setMedioChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });
      }else{
        //INSERT
        this.krService.save(kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setMedioChange(data);
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


