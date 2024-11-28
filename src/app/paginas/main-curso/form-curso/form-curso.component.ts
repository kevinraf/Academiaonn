import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Curso} from "../../../modelo/Curso";
import {CursoService} from "../../../servicio/curso.service";

@Component({
  selector: 'app-form-curso',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './form-curso.component.html',
  styleUrl: './form-curso.component.css'
})
export class FormCursoComponent implements OnInit {
  @ViewChild('CursoForm') CursoForm!: NgForm ;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Curso,
    private krService: CursoService,
    private _dialogRef: MatDialogRef<FormCursoComponent>
  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombre']);
      console.log(this.data['promedioGeneral']);

      this.form = new FormGroup({
        idCurso: new FormControl(this.data['idCurso']),
        nombre: new FormControl(this.data['nombre'], [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        promedioGeneral: new FormControl(this.data['promedioGeneral'], [Validators.required])
      });
    }else{
      this.form = new FormGroup({
        idCurso: new FormControl(0),
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        promedioGeneral: new FormControl('', [Validators.required])
      });
    }
  }
  close(){
    this._dialogRef.close();
  }
  operate(){
    const kr: Curso = new Curso();
    kr.idCurso = this.form.value['idCurso'];
    kr.nombre = this.form.value['nombre'];
    kr.nombre = this.form.value['promedioGeneral'];

    if(this.CursoForm.valid){
      if(kr.idCurso > 0){
        //UPDATE
        this.krService.update(kr.idCurso, kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setCursoChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });
      }else{
        //INSERT
        this.krService.save(kr)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setCursoChange(data);
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
