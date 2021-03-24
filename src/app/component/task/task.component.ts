import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';

import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AppService } from "../../service/app.service";
import {environment} from "../../../environments/environment";


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

  // headerForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTasks: Observable<string[]>;

  hazardList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
 
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

  addHazards(){
    this.headerForm.get('values').push(this.formBuilder.group({
      tasks:[''],
      hazards: [''],
      severity: ['', Validators.required],
      probability: ['', Validators.required]
    }))
  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTasks.filter(task => task.toLowerCase().indexOf(filterValue) === 0);
  }
  
}
