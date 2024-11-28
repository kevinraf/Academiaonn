import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {SedeService} from "../../../servicio/sede.service";
import {Sede} from "../../../modelo/Sede";

@Component({
  selector: 'app-form-sede',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './form-sede.component.html',
  styleUrl: './form-sede.component.css'
})
export class FormSedeComponent implements OnInit {
  @ViewChild('SedeForm') SedeForm!: NgForm ;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Sede,
    private krService: SedeService,
    private _dialogRef: MatDialogRef<FormSedeComponent>
  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombreSede']);

      this.form = new FormGroup({
        idSede: new FormControl(this.data['idSede']),
        nombreSede: new FormControl(this.data['nombreSede'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }else{
      this.form = new FormGroup({
        idSede: new FormControl(0),
        nombreSede: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    const kr: Sede = new Sede();
    kr.idSede = this.form.value['idSede'];
    kr.nombreSede = this.form.value['nombreSede'];

    if(this.SedeForm.valid){
      if(kr.idSede > 0){
        //UPDATE
        this.krService.update(kr.idSede, kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setSedeChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });
      }else{
        //INSERT
        this.krService.save(kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setSedeChange(data);
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
