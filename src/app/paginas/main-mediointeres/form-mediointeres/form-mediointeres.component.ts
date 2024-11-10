import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {MedioInteres} from "../../../modelo/MedioInteres";
import {MedioInteresService} from "../../../servicio/medio-interes.service";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-form-mediointeres',
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
  templateUrl: './form-mediointeres.component.html',
  styleUrl: './form-mediointeres.component.css'
})
export class FormMediointeresComponent implements OnInit {
  @ViewChild('MediointeresForm') mediointeresForm!: NgForm ;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: MedioInteres,
    private krService: MedioInteresService,
    private _dialogRef: MatDialogRef<FormMediointeresComponent>

  ){}
  ngOnInit(): void {
    if(this.data!==undefined){
      console.log(this.data['nombreMedio']);

      this.form = new FormGroup({
        idMedioInteres: new FormControl(this.data['idMedioInteres']),
        nombreMedio: new FormControl(this.data['nombreMedio'], [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
      });


    }else{
      this.form = new FormGroup({
        idMedioInteres: new FormControl(0),
        nombreMedio: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)])
      });
    }
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    const mediointeres: MedioInteres = new MedioInteres();
    mediointeres.idMedioInteres = this.form.value['idMedioInteres'];
    mediointeres.nombreMedio = this.form.value['nombreMedio'];

    if(this.mediointeresForm.valid){
      if(mediointeres.idMedioInteres > 0){
        //UPDATE
        this.krService.update(mediointeres.idMedioInteres, mediointeres)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setMedioInteresChange(data);
            this.krService.setMessageChange('UPDATED!');
            this.close();
          });

      }else{
        //INSERT
        this.krService.save(mediointeres)
          .pipe(switchMap( ()=> this.krService.findAll() ))
          .subscribe(data => {
            this.krService.setMedioInteresChange(data);
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
