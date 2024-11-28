import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MaterialModule} from "../../material/material.module";
import {Apoderado} from "../../modelo/Apoderado";
import {ApoderadoService} from "../../servicio/apoderado.service";
import {FormApoderadoComponent} from "./form-apoderado/form-apoderado.component";

@Component({
  selector: 'app-main-apoderado',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './main-apoderado.component.html',
  styleUrl: './main-apoderado.component.css'
})
export class MainApoderadoComponent implements OnInit {
  dataSource: MatTableDataSource<Apoderado>;
  columnsDefinitions = [
    { def: 'idApoderado', label: 'idApoderado', hide: true},
    { def: 'nombrecompleto', label: 'nombrecompleto', hide: false},
    { def: 'apellidopaterno', label: 'apellidopaterno', hide: false},
    { def: 'apellidomaterno', label: 'apellidomaterno', hide: false},
    { def: 'celular', label: 'celular', hide: false},
    { def: 'celularrespaldo', label: 'celularrespaldo', hide: false},
    { def: 'dni', label: 'dni', hide: false},
    { def: 'correo', label: 'correo', hide: false},
    { def: 'acciones', label: 'acciones', hide: false}
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private krervice: ApoderadoService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.krervice.findAll().subscribe(data => this.createTable(data));

    this.krervice.getApoderadoChange().subscribe(data => this.createTable(data));
    this.krervice.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}))
  }
  createTable(data: Apoderado[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }
  openDialog(krentidad?: Apoderado){
    this._dialog.open(FormApoderadoComponent, {
      width: '150px',
      data: krentidad,
      disableClose: true
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(idMedic: number){
    this.krervice.delete(idMedic)
      .pipe(switchMap( ()=> this.krervice.findAll()))
      .subscribe(data => {
        this.krervice.setApoderadoChange(data);
        this.krervice.setMessageChange('DELETED!');
      });
  }
}
