import {Component, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Estudiante} from "../../modelo/Estudiante";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EstudianteService} from "../../servicio/estudiante.service";
import {switchMap} from "rxjs";
import {FormEstudianteComponent} from "./form-estudiante/form-estudiante.component";

@Component({
  selector: 'app-main-estudiante',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './main-estudiante.component.html',
  styleUrl: './main-estudiante.component.css'
})
export class MainEstudianteComponent implements OnInit {

  dataSource: MatTableDataSource<Estudiante>;

  columnsDefinitions = [
    { def: 'idEstudiante', label: 'idEstudiante', hide: true},
    { def: 'nombreCompleto', label: 'nombreCompleto', hide: false},
    { def: 'apellidoPaterno', label: 'apellidoPaterno', hide: false},
    { def: 'apellidoMaterno', label: 'apellidoMaterno', hide: false},
    { def: 'dni', label: 'dni', hide: false},
    { def: 'medioInteres', label: 'medioInteres', hide: false},
    { def: 'acciones', label: 'acciones', hide: false}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private krervice: EstudianteService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.krervice.findAll().subscribe(data => this.createTable(data));

    this.krervice.getEstudianteChange().subscribe(data => this.createTable(data));
    this.krervice.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}))
  }
  createTable(data: Estudiante[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  openDialog(estudiante?: Estudiante){
    this._dialog.open(FormEstudianteComponent, {
      width: '750px',
      data: estudiante,
      disableClose: true
    });
  }


  delete(idMedic: number){
    this.krervice.delete(idMedic)
      .pipe(switchMap( ()=> this.krervice.findAll()))
      .subscribe(data => {
        this.krervice.setEstudianteChange(data);
        this.krervice.setMessageChange('DELETED!');
      });
  }

}





























