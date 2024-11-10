import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {switchMap} from "rxjs";
import {Insidencia} from "../../../modelo/Insidencia";
import {InsidenciaService} from "../../../servicio/insidencia.service";

@Component({
  selector: 'app-form-insidencia',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatToolbar,
    ReactiveFormsModule
  ],
  templateUrl: './form-insidencia.component.html',
  styleUrl: './form-insidencia.component.css'
})
export class FormInsidenciaComponent implements OnInit {

  @ViewChild('InsidenciaForm') insidenciaForm!: NgForm;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Insidencia,
    private krService: InsidenciaService,
    private _dialogRef: MatDialogRef<FormInsidenciaComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.data !== undefined) {
      console.log(this.data['descripcion']);
      console.log(this.data['castigo']);
      console.log(this.data['estudiante']);


      this.form = new FormGroup({
        idInsidencia: new FormControl(this.data['idInsidencia']),

        descripcion: new FormControl(this.data['descripcion'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        castigo: new FormControl(this.data['castigo'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        estudiante: new FormControl(this.data['estudiante'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      });


    } else {
      this.form = new FormGroup({
        idInsidencia: new FormControl(0),

        descripcion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        castigo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        estudiante: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),

      });
    }
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    const insidencia: Insidencia = new Insidencia();
    insidencia.idInsidencia = this.form.value['idInsidencia'];

    insidencia.descripcion = this.form.value['descripcion'];
    insidencia.castigo = this.form.value['castigo'];
    insidencia.estudiante = this.form.value['estudiante'];

    if (this.insidenciaForm.valid) {
      if (insidencia.idInsidencia > 0) {
        //UPDATE
        this.krService.update(insidencia.idInsidencia, insidencia)
          .pipe(switchMap(() => this.krService.findAll()))
          .subscribe(data => {
            this.krService.setInsidenciaChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });

      } else {
        //INSERT
        this.krService.save(insidencia)
          .pipe(switchMap(() => this.krService.findAll()))
          .subscribe(data => {
            this.krService.setInsidenciaChange(data);
            this.krService.setMessageChange('CREATED!');
            this.close();
          });
      }
    } else {
      console.log("Error....")
    }

  }

  get f() {
    return this.form.controls;
  }



}
