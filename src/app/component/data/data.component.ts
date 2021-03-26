import { Component, ChangeDetectorRef, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { DataService } from "../../service/data.service";
import { BuilderService } from "../../service/builder.service";

import { IdbCrudService } from "../../service-idb/idb-crud.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit {

  @Input() form;

  user;
  forms;
  files;
  token;
  columns;
  isFiles: boolean = false;
  isData: boolean = false;

  filePaths = [];
  columnLabels:Array<String> = [];
  currentIndex: number;
  currentFileIndex: number;

  columnsToDisplay: string[];

  data: any;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    private dialog: MatDialog,
    public appService: AppService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private dataService: DataService,
    public builderService: BuilderService,
    public idbCrudService: IdbCrudService,
    changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  //   this.sort.sort(<MatSortable>{
  //     id: 'id',
  //     start: 'desc'
  //   }
  // );
    this.getIdb();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  transform(file) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(file);
  }

  getIdb() {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.data = data;

      if (this.data.length > 0) {
        
        // this.data = this.data.filter(
        //   data => data.form_id === this.appService.formObj.form_id
        // );
        // this.columnLabels = JSON.parse(this.appService.formObj.form.labels);
        this.setTable();
      }
    });
  }

  getCloud() {
    let obj = ({
      form_id: this.appService.formObj.form_id,
      tenant_id: this.appService.formObj.tenant_id
    })

    this.dataService.getData(obj).subscribe(data => {
      this.data = data;

      if (this.data.length > 0) this.setTable();

    });
  }

  setTable() {
    this.columns = [];
    this.columnLabels = ["Date", "Company", "Location","Muster Point", "Job Number", "PPE Inspection"];
    this.columns = this.columnLabels.map(d => {let k = d.split(" "); k[0]= k[0].toLowerCase(); return k.join("");});

    console.log(this.columns);
    // colIndex = this.columns.findIndex(col => col === 'tenant_id');
    // this.columns.splice(colIndex, 1);
    // colIndex = this.columns.findIndex(col => col === 'form_id');
    // this.columns.splice(colIndex, 1);
    // colIndex = this.columns.findIndex(col => col === 'date_archived');
    // this.columns.splice(colIndex, 1);
    // colIndex = this.columns.findIndex(col => col === 'id');
    // this.columns.splice(colIndex, 1);
    // colIndex = this.columns.findIndex(col => col === 'is_file');
    // this.columns.splice(colIndex, 1);
    // colIndex = this.columns.findIndex(col => col === 'file_array');
    // this.columns.splice(colIndex, 1);
    // colIndex = this.columns.findIndex(col => col === 'user_created');
    // this.columns.splice(colIndex, 1);
    // colIndex = this.columns.findIndex(col => col === 'form_columns');
    // this.columns.splice(colIndex, 1);

    // this.columnLabels = JSON.parse(this.appService.formObj.form.labels);
    // this.columnLabels.push('Date Created');

    this.columnsToDisplay = this.columns;
    this.dataSource.data = this.data.map(d=> { let k={}; k=d["company"];k["hazards"]=d.hazards["values"]; return k;});
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isData = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
  
  }

  openList() {
    this.appService.isListMenu = true;
  }

  sortDataSource(id: string, start: string) {
    this.dataSource.sort.sort(<MatSortable>({ id: id, start: start }));
    this.dataSource.data.sort((a: any, b: any) => {
        if (a.createdDate < b.createdDate) {
            return -1;
        } else if (a.createdDate > b.createdDate) {
            return 1;
        } else {
            return 0;
        }
    });
}

}