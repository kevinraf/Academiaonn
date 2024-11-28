import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Nivel} from "../../../modelo/Nivel";
import {NivelService} from "../../../servicio/nivel.service";

@Component({
  selector: 'app-form-nivel',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './form-nivel.component.html',
  styleUrl: './form-nivel.component.css'
})
export class FormNivelComponent implements OnInit {
  @ViewChild('NivelForm') NivelForm!: NgForm ;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Nivel,
    private krService: NivelService,
    private _dialogRef: MatDialogRef<FormNivelComponent>
  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombre']);

      this.form = new FormGroup({
        idNivel: new FormControl(this.data['idNivel']),
        nombre: new FormControl(this.data['nombre'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }else{
      this.form = new FormGroup({
        idNivel: new FormControl(0),
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      });
    }
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    const kr: Nivel = new Nivel();
    kr.idNivel = this.form.value['idNivel'];
    kr.nombre = this.form.value['nombre'];

    if(this.NivelForm.valid){
      if(kr.idNivel > 0){
        //UPDATE
        this.krService.update(kr.idNivel, kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setNivelChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });
      }else{
        //INSERT
        this.krService.save(kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setNivelChange(data);
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
