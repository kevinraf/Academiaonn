import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Apoderado} from "../../../modelo/Apoderado";
import {ApoderadoService} from "../../../servicio/apoderado.service";

@Component({
  selector: 'app-form-apoderado',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './form-apoderado.component.html',
  styleUrl: './form-apoderado.component.css'
})
export class FormApoderadoComponent implements OnInit {
  @ViewChild('ApoderadoForm') ApoderadoForm!: NgForm ;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Apoderado,
    private krService: ApoderadoService,
    private _dialogRef: MatDialogRef<FormApoderadoComponent>
  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombrecompleto']);
      console.log(this.data['apellidopaterno']);
      console.log(this.data['apellidomaterno']);
      console.log(this.data['celular']);
      console.log(this.data['celularrespaldo']);
      console.log(this.data['dni']);
      console.log(this.data['correo']);

      this.form = new FormGroup({
        idApoderado: new FormControl(this.data['idApoderado']),
        nombrecompleto: new FormControl(this.data['nombrecompleto'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        apellidopaterno: new FormControl(this.data['apellidopaterno'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        apellidomaterno: new FormControl(this.data['apellidomaterno'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        celular: new FormControl(this.data['celular'], [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
        celularrespaldo: new FormControl(this.data['celularrespaldo'], [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
        dni: new FormControl(this.data['dni'], [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        correo: new FormControl(this.data['correo'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      });
    }else{
      this.form = new FormGroup({
        idApoderado: new FormControl(0),
        nombrecompleto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        apellidopaterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        apellidomaterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        celular: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
        celularrespaldo: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
        dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        correo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      });
    }
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    const kr: Apoderado = new Apoderado();
    kr.idApoderado = this.form.value['idApoderado'];
    kr.nombrecompleto = this.form.value['nombrecompleto'];
    kr.apellidopaterno = this.form.value['apellidopaterno'];
    kr.apellidomaterno = this.form.value['apellidomaterno'];
    kr.celular = this.form.value['celular'];
    kr.celularrespaldo = this.form.value['celularrespaldo'];
    kr.dni = this.form.value['dni'];
    kr.correo = this.form.value['correo'];

    if(this.ApoderadoForm.valid){
      if(kr.idApoderado > 0){
        //UPDATE
        this.krService.update(kr.idApoderado, kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setApoderadoChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });
      }else{
        //INSERT
        this.krService.save(kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setApoderadoChange(data);
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

