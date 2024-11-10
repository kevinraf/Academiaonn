import {Component, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {switchMap} from "rxjs";
import {Trabajador} from "../../modelo/Trabajador";
import {TrabajadorService} from "../../servicio/trabajador.service";
import {FormTrabajadorComponent} from "./form-trabajador/form-trabajador.component";

@Component({
  selector: 'app-main-trabajador',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './main-trabajador.component.html',
  styleUrl: './main-trabajador.component.css'
})
export class MainTrabajadorComponent implements OnInit {
  dataSource: MatTableDataSource<Trabajador>;

  columnsDefinitions = [
    { def: 'idTrabajador', label: 'idTrabajador', hide: true},
    { def: 'nombre', label: 'nombre', hide: false},
    { def: 'apellido', label: 'apellido', hide: false},
    { def: 'contrasena', label: 'contrasena', hide: false},
    { def: 'cargo', label: 'cargo', hide: false},
    { def: 'acciones', label: 'acciones', hide: false}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private krervice: TrabajadorService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.krervice.findAll().subscribe(data => this.createTable(data));

    this.krervice.getTrabajadorChange().subscribe(data => this.createTable(data));
    this.krervice.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}))
  }
  createTable(data: Trabajador[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  openDialog(trabajador?: Trabajador){
    this._dialog.open(FormTrabajadorComponent, {
      width: '750px',
      data: trabajador,
      disableClose: true
    });
  }


  delete(idMedic: number){
    this.krervice.delete(idMedic)
      .pipe(switchMap( ()=> this.krervice.findAll()))
      .subscribe(data => {
        this.krervice.setTrabajadorChange(data);
        this.krervice.setMessageChange('DELETED!');
      });
  }

}
