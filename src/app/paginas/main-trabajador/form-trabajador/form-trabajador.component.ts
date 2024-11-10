import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {switchMap} from "rxjs";
import {Trabajador} from "../../../modelo/Trabajador";
import {TrabajadorService} from "../../../servicio/trabajador.service";

@Component({
  selector: 'app-form-trabajador',
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
  templateUrl: './form-trabajador.component.html',
  styleUrl: './form-trabajador.component.css'
})
export class FormTrabajadorComponent implements OnInit {
  @ViewChild('TrabajadorForm') trabajadorForm!: NgForm;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Trabajador,
    private krService: TrabajadorService,
    private _dialogRef: MatDialogRef<FormTrabajadorComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.data !== undefined) {
      console.log(this.data['nombre']);
      console.log(this.data['apellido']);
      console.log(this.data['contrasena']);
      console.log(this.data['cargo']);


      this.form = new FormGroup({
        idTrabajador: new FormControl(this.data['idTrabajador']),

        nombre: new FormControl(this.data['nombre'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        apellido: new FormControl(this.data['apellido'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        contrasena: new FormControl(this.data['contrasena'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        cargo: new FormControl(this.data['cargo'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      });


    } else {
      this.form = new FormGroup({
        idTrabajador: new FormControl(0),

        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        contrasena: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        cargo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),

      });
    }
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    const trabajador: Trabajador = new Trabajador();
    trabajador.idTrabajador = this.form.value['idTrabajador'];

    trabajador.nombre = this.form.value['nombre'];
    trabajador.apellido = this.form.value['apellido'];
    trabajador.contrasena = this.form.value['contrasena'];
    trabajador.cargo = this.form.value['cargo'];

    if (this.trabajadorForm.valid) {
      if (trabajador.idTrabajador > 0) {
        //UPDATE
        this.krService.update(trabajador.idTrabajador, trabajador)
          .pipe(switchMap(() => this.krService.findAll()))
          .subscribe(data => {
            this.krService.setTrabajadorChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });

      } else {
        //INSERT
        this.krService.save(trabajador)
          .pipe(switchMap(() => this.krService.findAll()))
          .subscribe(data => {
            this.krService.setTrabajadorChange(data);
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
