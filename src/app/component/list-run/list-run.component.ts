import { Component, OnChanges, Input } from '@angular/core'
import { BuilderService } from "../../service/builder.service"

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { DataService } from "../../service/data.service"
import { SuccessService } from "../../service/success.service"

import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-list-run',
  templateUrl: './list-run.component.html',
  styleUrls: ['./list-run.component.scss']
})
export class ListRunComponent implements OnChanges {

  @Input() formObj

  runForm: FormGroup

  id = new FormControl('');

  user
  data
  allData
  selectedIdx
  isSync = false

  dataSource = new MatTableDataSource()

  displayedColumns: string[] = ['id']

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService) { 
      this.runForm = this.formBuilder.group({
        item: ['', Validators.required]
      })
    }

  ngOnChanges() {
    this.getIdb()
  }

  edit(idx, element) {
    console.log(element)
    this.selectedIdx = idx
    this.id.setValue(element.value)
  }

  saveIdb() {
    let data = this.runForm.value

    let list = this.allData.filter(
      data => data.form_id === this.appService.formObj.form_id
    )

    if (list.length === 0) {
      let dataArray = []
      dataArray.push(data)
      data["user_created"] = { email: 'polly@formloco.com', date_created: new Date() }
      data["date_archived"] = undefined
      data["date_created"] = new Date()
      let obj = {
        form_id: this.appService.formObj.form_id,
        name: this.appService.formObj.name,
        tenant_id: this.appService.formObj.tenant_id,
        columns: this.appService.formObj.form.columns,
        data: dataArray
      }
      this.idbCrudService.put('list_data', obj)
    }
    else {
      list[0].data.push(data)
      this.idbCrudService.delete('list_data', list[0].id)
      this.idbCrudService.put('list_data', list[0])
    }

    this.idbCrudService.put('form', this.appService.formObj)

    this.successService.popSnackbar('Successfully Saved.')

    this.runForm.reset()
    this.isSync = true
    this.getIdb()
  }

  updateIdb() {
    let list = this.allData.filter(
      data => data.form_id === this.appService.formObj.form_id
    )
    list[0].data[this.selectedIdx].value = this.id.value
    this.idbCrudService.put('list_data', list[0])
    this.id.reset()
    this.selectedIdx = undefined
    this.isSync = true
    this.getIdb()
  }

  deleteIdb(idx) {
    let list = this.allData.filter(
      data => data.form_id === this.appService.formObj.form_id
    )
    list[0].data[this.selectedIdx].value = this.id.value

    list[0].data.splice(idx, 1)
    
    this.idbCrudService.put('list_data', list[0])
    this.dataSource.data.splice(idx, 1)
    this.dataSource._updateChangeSubscription()
    this.id.reset()
    this.selectedIdx = undefined
    this.isSync = true
    this.getIdb()
  }

  getIdb() {
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.allData = data
      if (this.allData.length > 0) {
        let list = this.allData.filter(
          data => data.form_id === this.appService.formObj.form_id
        )
        this.dataSource.data = list[0].data
        
      }
    })
  }

  openList() {
    this.appService.isListMenu = true;
  }
  
}

