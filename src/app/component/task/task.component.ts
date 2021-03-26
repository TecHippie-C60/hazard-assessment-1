import { Component, ElementRef, ViewChild, Input, OnInit, Output, EventEmitter } from '@angular/core';

import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AppService } from "../../service/app.service";
import {environment} from "../../../environments/environment";
// import EventEmitter from 'events';


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
export class TaskComponent implements OnInit{

  @Input() headerForm;
  @Output() isPanelOpen = new EventEmitter();
  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('headerAuto') matAutocompleteHeader: MatAutocomplete;

  // headerForm: FormGroup;

  panelOpenState:boolean = false
  selectedIndex = 0;
  visible = true
  selectable = true
  removable = true
  separatorKeysCodes: number[] = [ENTER, COMMA]
  
  taskCtrl = new FormControl()
  filteredTasks: Observable<string[]>;

  hazardList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
  tasks: any = [];
  severities: Severity[] = [];
  probabilities: Probability[] = [];
  values: FormArray;
 

  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder) {
    // this.headerForm = this.formBuilder.group({
    //   tasks: ['']
    // });


    
  }
  ngOnInit() {
    this.values = this.headerForm.get('values');
    this.appService.getListData().subscribe(data => {
      this.hazardList = data.filter(d => {return d.name =="hazards"})[0]?.data?.map(d => { return d.item });
      this.severities = data.filter(d => {return d.name =="severities"})[0]?.data?.map(d => { return {viewValue:d.item, value: d.item} });
      this.probabilities = data.filter(d => { return d.name =="probabilities"})[0]?.data?.map(d => { return {viewValue:d.item, value: d.item} });
    })                                 
  }

  addTask(){
   this.panelOpenState = false;
  }
  addMoreTasks()
  {
    this.headerForm.get('values').push(this.formBuilder.group({
      tasks:[''],
      hazards: [''],
      severity: ['', Validators.required],
      probability: ['', Validators.required]
    }))
    this.selectedIndex = this.headerForm.get('values').length -1;
    this.panelOpenState = true;
    this.isPanelOpen.emit(this.panelOpenState);
  }
  // addTask() {
  //   let headerValue = this.headerForm.get('value')
    // console.log(this.headerTasks, this.headerForm.value)
  // }



  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allTasks.filter(task => task.toLowerCase().indexOf(filterValue) === 0);
  // }
  panelOpened(index)
  {
    console.log("panel opened "+index);
    this.selectedIndex = index;
    this.panelOpenState = true;
    this.isPanelOpen.emit(this.panelOpenState);
  }

  panelClosed(index)
  {
    console.log("panel closed "+index);
    if(index == this.selectedIndex)
    {
      this.panelOpenState = false;
      this.isPanelOpen.emit(this.panelOpenState);
    }
  }
}
