import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MaterialModule } from "../../../material/material.module";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { switchMap } from "rxjs";
import { Cargo } from "../../../modelo/Cargo";
import { CargoService } from "../../../servicio/cargo.service";
import { MatSnackBar } from '@angular/material/snack-bar';

// Importamos CommonModule y ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-cargo',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],  // Asegúrate de que estos módulos están importados
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css']
})
export class FormCargoComponent implements OnInit {
  form: FormGroup;
  public data: Cargo;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: Cargo, // Recibiendo los datos
    private krService: CargoService,
    private _dialogRef: MatDialogRef<FormCargoComponent>,
    private _snackBar: MatSnackBar // Inyectamos el MatSnackBar
  ) {
    this.data = _data;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idCargo: new FormControl(this.data ? this.data.idCargo : 0),
      nombreCargo: new FormControl(this.data ? this.data.nombreCargo : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])
    });
  }

  close(): void {
    this._dialogRef.close();
  }

  operate(): void {
    if (this.form.valid) {
      const cargo: Cargo = this.form.value;

      if (cargo.idCargo > 0) {
        this.krService.update(cargo.idCargo, cargo)
          .pipe(switchMap(() => this.krService.findAll()))
          .subscribe({
            next: data => {
              this.krService.setCargoChange(data);
              this.krService.setMessageChange('UPDATED!');
              // Mostramos el Snackbar con la clase 'yellow-snackbar'
              this._snackBar.open('UPDATED!', '', {
                duration: 3000,
                panelClass: ['yellow-snackbar'], // Se usa la clase correcta
                verticalPosition: 'top',
                horizontalPosition: 'right'
              });
              this.close();
            },
            error: err => {
              this.krService.setMessageChange('Error al actualizar el cargo');
              // Mostramos el Snackbar con la clase 'error-snackbar'
              this._snackBar.open('Error al actualizar', '', {
                duration: 3000,
                panelClass: ['error-snackbar'],
                verticalPosition: 'top',
                horizontalPosition: 'right'
              });
            }
          });
      } else {
        this.krService.save(cargo)
          .pipe(switchMap(() => this.krService.findAll()))
          .subscribe({
            next: data => {
              this.krService.setCargoChange(data);
              this.krService.setMessageChange('CREATED!');
              // Mostramos el Snackbar con la clase 'green-snackbar'
              this._snackBar.open('CREATED!', '', {
                duration: 3000,
                panelClass: ['green-snackbar'], // Se usa la clase correcta
                verticalPosition: 'top',
                horizontalPosition: 'right'
              });
              this.close();
            },
            error: err => {
              this.krService.setMessageChange('Error al crear el cargo');
              // Mostramos el Snackbar con la clase 'error-snackbar'
              this._snackBar.open('Error al crear', '', {
                duration: 3000,
                panelClass: ['error-snackbar'],
                verticalPosition: 'top',
                horizontalPosition: 'right'
              });
            }
          });
      }
    }
  }

  get f() {
    return this.form.controls;
  }
}
