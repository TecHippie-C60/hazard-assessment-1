import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort, MatSortable } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { DomSanitizer } from '@angular/platform-browser'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { DataService } from "../../service/data.service"
import { BuilderService } from "../../service/builder.service"

import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Input() form

  user
  forms
  files
  token
  columns
  isFiles: boolean = false
  isData: boolean = false

  filePaths = []
  columnLabels: Array<String> = []
  currentIndex: number
  currentFileIndex: number

  columnsToDisplay: string[]

  data: any
  dataSource: MatTableDataSource<any>

  constructor(
    media: MediaMatcher,
    private dialog: MatDialog,
    public appService: AppService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private dataService: DataService,
    public builderService: BuilderService,
    public idbCrudService: IdbCrudService) { }

  ngOnInit() {
    this.user = this.authService.userSignedIn()
    if (this.user !== null) this.getCloud()
    else this.getIdb()
  }

  transform(file) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(file)
  }

  getIdb() {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.data = data
      if (this.data !== undefined) this.setTable()
    })
  }

  getCloud() {
    let obj = ({
      form_id: this.appService.formObj.form_id,
      tenant_id: this.appService.formObj.tenant_id
    })

    this.dataService.getData(obj).subscribe(data => {
      this.data = data

      if (this.data.length > 0) this.setTable()

    })
  }

  setTable() {
    this.dataSource = this.data
    this.isData = true
    this.columns = Object.keys(this.data[0])
    this.columnLabels = JSON.parse(this.builderService.formObj.form.labels)
    this.columnLabels.push('Date Created')
    this.columnLabels.push('User Created')

    let colIndex
    colIndex = this.columns.findIndex(col => col === 'tenant_id')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'form_id')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'date_archived')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'date_updated')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'id')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'is_file')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'file_array')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'user_updated')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'user_archived')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'form_columns')
    if (colIndex != -1) this.columns.splice(colIndex, 1)

    this.columnsToDisplay = this.columns.reverse()
    this.isData = true
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  close() {

  }

  openList() {
    this.appService.isListMenu = true
  }

}