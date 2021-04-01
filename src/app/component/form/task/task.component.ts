import { Component, ElementRef, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core'

import {COMMA, ENTER} from '@angular/cdk/keycodes'

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { environment } from "../../../../environments/environment"

interface Severity {
  value: string,
  viewValue: string
}
interface Probability {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnChanges{

  @Input() hazardsForm
  
  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement>
  @ViewChild('auto') matAutocomplete: MatAutocomplete
  @ViewChild('headerAuto') matAutocompleteHeader: MatAutocomplete

  panelOpenState:boolean = false
  selectedIndex = 0
  visible = true
  selectable = true
  removable = true
  separatorKeysCodes: number[] = [ENTER, COMMA]
  
  taskCtrl = new FormControl()
  filteredTasks: Observable<string[]>

  hazardList: string[] = []
  
  data
  tasks: any = []
  severities: Severity[] = []
  probabilities: Probability[] = []
  values: FormArray
 
  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder,
    private idbCrudService: IdbCrudService) {}

  ngOnChanges() {
    console.log(this.hazardsForm)
    if (this.hazardsForm.value.values.length > 1) this.appService.isNew = true
    this.values = this.hazardsForm.get('values')
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.data = data
      this.hazardList = this.data.filter(d => {return d.name =="hazards"})[0].data.map(d => { return d.item })
      this.severities = this.data.filter(d => {return d.name =="severities"})[0].data.map(d => { return d.item })
      this.probabilities = this.data.filter(d => { return d.name =="probabilities"})[0].data.map(d => { return d.item })
    })              
  }

  saveTask(){
    this.appService.isNew = true
    this.panelOpenState = false
  }

  addMoreTasks() {
    this.hazardsForm.get('values').push(this.formBuilder.group({
      tasks:[''],
      hazards: [''],
      severity: [''],
      probability: ['']
    }))
    this.selectedIndex = this.hazardsForm.get('values').length -1
    this.panelOpenState = true
    this.appService.isNew = true
  }
 
  panelOpened(index) {
    this.selectedIndex = index
    this.panelOpenState = true
  }

  panelClosed(index) {
    if (index == this.selectedIndex) this.panelOpenState = false
  }

}
