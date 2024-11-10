import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormCargoComponent} from "../main-cargo/form-cargo/form-cargo.component";
import {switchMap} from "rxjs";
import {MedioInteres} from "../../modelo/MedioInteres";
import {MedioInteresService} from "../../servicio/medio-interes.service";
import {MaterialModule} from "../../material/material.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormMediointeresComponent} from "./form-mediointeres/form-mediointeres.component";

@Component({
  selector: 'app-main-mediointeres',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './main-mediointeres.component.html',
  styleUrl: './main-mediointeres.component.css'
})
export class MainMediointeresComponent implements OnInit {
  dataSource: MatTableDataSource<MedioInteres>;

  columnsDefinitions = [
    { def: 'idMedioInteres', label: 'idMedioInteres', hide: true},
    { def: 'nombreMedio', label: 'nombreMedio', hide: false},
    { def: 'acciones', label: 'acciones', hide: false}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private krervice: MedioInteresService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.krervice.findAll().subscribe(data => this.createTable(data));

    this.krervice.getMedioInteresChange().subscribe(data => this.createTable(data));
    this.krervice.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}))
  }

  createTable(data: MedioInteres[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  openDialog(medioInteres?: MedioInteres){
    this._dialog.open(FormMediointeresComponent, {
      width: '750px',
      data: medioInteres,
      disableClose: true
    });
  }


  delete(idMedic: number){
    this.krervice.delete(idMedic)
      .pipe(switchMap( ()=> this.krervice.findAll()))
      .subscribe(data => {
        this.krervice.setMedioInteresChange(data);
        this.krervice.setMessageChange('DELETED!');
      });
  }


}
