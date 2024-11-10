import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {switchMap} from "rxjs";
import {Insidencia} from "../../modelo/Insidencia";
import {InsidenciaService} from "../../servicio/insidencia.service";
import {FormInsidenciaComponent} from "./form-insidencia/form-insidencia.component";
import {MaterialModule} from "../../material/material.module";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-insidencia',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './main-insidencia.component.html',
  styleUrl: './main-insidencia.component.css'
})
export class MainInsidenciaComponent implements OnInit {
  dataSource: MatTableDataSource<Insidencia>;

  columnsDefinitions = [
    { def: 'idInsidencia', label: 'idInsidencia', hide: true},
    { def: 'descripcion', label: 'descripcion', hide: false},
    { def: 'castigo', label: 'castigo', hide: false},
    { def: 'estudiante', label: 'estudiante', hide: false},
    { def: 'acciones', label: 'acciones', hide: false}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private krervice: InsidenciaService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.krervice.findAll().subscribe(data => this.createTable(data));

    this.krervice.getInsidenciaChange().subscribe(data => this.createTable(data));
    this.krervice.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}))
  }
  createTable(data: Insidencia[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  openDialog(insidencia?: Insidencia){
    this._dialog.open(FormInsidenciaComponent, {
      width: '750px',
      data: insidencia,
      disableClose: true
    });
  }


  delete(idMedic: number){
    this.krervice.delete(idMedic)
      .pipe(switchMap( ()=> this.krervice.findAll()))
      .subscribe(data => {
        this.krervice.setInsidenciaChange(data);
        this.krervice.setMessageChange('DELETED!');
      });
  }

}
