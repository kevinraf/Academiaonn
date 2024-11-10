import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";


import {Cargo} from "../../../modelo/Cargo";
import {CargoService} from "../../../servicio/cargo.service";


@Component({
  selector: 'app-form-cargo',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './form-cargo.component.html',
  styleUrl: './form-cargo.component.css'
})
export class FormCargoComponent implements OnInit {
  @ViewChild('CargoForm') cargoForm!: NgForm ;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Cargo,
    private krService: CargoService,
    private _dialogRef: MatDialogRef<FormCargoComponent>
  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombreCargo']);

      this.form = new FormGroup({
        idCargo: new FormControl(this.data['idCargo']),
        nombreCargo: new FormControl(this.data['nombreCargo'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
      });
    }else{
      this.form = new FormGroup({
        idCargo: new FormControl(0),
        nombreCargo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)])
      });
    }
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    const kr: Cargo = new Cargo();
    kr.idCargo = this.form.value['idCargo'];
    kr.nombreCargo = this.form.value['nombreCargo'];

    if(this.cargoForm.valid){
      if(kr.idCargo > 0){
        //UPDATE
        this.krService.update(kr.idCargo, kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setCargoChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });
      }else{
        //INSERT
        this.krService.save(kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setCargoChange(data);
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
