import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {Estudiante} from "../../../modelo/Estudiante";
import {EstudianteService} from "../../../servicio/estudiante.service";
import {switchMap} from "rxjs";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";


@Component({
  selector: 'app-form-estudiante',
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
  templateUrl: './form-estudiante.component.html',
  styleUrl: './form-estudiante.component.css'
})
export class FormEstudianteComponent implements OnInit {
  @ViewChild('EstudianteForm') estudianteForm!: NgForm;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Estudiante,
    private krService: EstudianteService,
    private _dialogRef: MatDialogRef<FormEstudianteComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.data !== undefined) {
      console.log(this.data['nombreCompleto']);
      console.log(this.data['apellidoPaterno']);
      console.log(this.data['apellidoMaterno']);
      console.log(this.data['dni']);
      console.log(this.data['medioInteres']);

      this.form = new FormGroup({
        idEstudiante: new FormControl(this.data['idEstudiante']),
        nombreCompleto: new FormControl(this.data['nombreCompleto'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        apellidoPaterno: new FormControl(this.data['apellidoPaterno'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        apellidoMaterno: new FormControl(this.data['apellidoMaterno'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        dni: new FormControl(this.data['dni'], [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        medioInteres: new FormControl(this.data['medioInteres'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
      });


    } else {
      this.form = new FormGroup({
        idEstudiante: new FormControl(0),
        nombreCompleto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        apellidoPaterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        apellidoMaterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        medioInteres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
      });
    }
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    const estudiante: Estudiante = new Estudiante();
    estudiante.idEstudiante = this.form.value['idEstudiante'];
    estudiante.nombreCompleto = this.form.value['nombreCompleto'];
    estudiante.apellidoPaterno = this.form.value['apellidoPaterno'];
    estudiante.apellidoMaterno = this.form.value['apellidoMaterno'];
    estudiante.dni = this.form.value['dni'];
    estudiante.medioInteres = this.form.value['medioInteres'];

    if (this.estudianteForm.valid) {
      if (estudiante.idEstudiante > 0) {
        //UPDATE
        this.krService.update(estudiante.idEstudiante, estudiante)
          .pipe(switchMap(() => this.krService.findAll()))
          .subscribe(data => {
            this.krService.setEstudianteChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });

      } else {
        //INSERT
        this.krService.save(estudiante)
          .pipe(switchMap(() => this.krService.findAll()))
          .subscribe(data => {
            this.krService.setEstudianteChange(data);
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

