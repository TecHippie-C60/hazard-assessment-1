import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';

import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AppService } from "../../service/app.service";


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
  tasks: string[][] = [];
  allTasks: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  hazardList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  

  severities: Severity[] = [
    {viewValue:'Imminent Danger', value: 'imminent-danger'},
    {viewValue:'Serious', value: 'serious'},
    {viewValue:'Minor', value:'minor'},
    {viewValue:'Not applicable', value: 'NA'}
      ];
  
  probabilities: Probability[] = [
    {viewValue: 'Probable', value: 'probable' },
    {viewValue: 'Reasonably Probable', value: 'reasonably-probable'},
    {viewValue:'Remote', value: 'remote'},
    {viewValue: 'Extremely Remote', value: 'extremely-remote'}
  ];
  values: FormArray;
  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder) {
    // this.headerForm = this.formBuilder.group({
    //   tasks: ['']
    // });

    
  }
  ngOnInit() {
    // this.filteredTasks = this.headerForm.valueChanges.pipe(
    //   startWith(null),
    //   map((task: string | null) => task ? this._filter(task) : this.allTasks.slice()));
    this.filteredTasks = this.headerForm.get('values').valueChanges.pipe(data => this.valueChanged(data))
    
    this.values = this.headerForm.get('values')
  }
  addHazards(){
    this.headerForm.get('values').push(this.formBuilder.group({
      tasks:[''],
      hazards: [''],
      severity: ['', Validators.required],
      probability: ['', Validators.required]
    }))
  }
  valueChanged(data)
  {
    console.log(data);
    return this.allTasks;
  }
  add(event: MatChipInputEvent, i:number): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      (this.tasks[i] ||(this.tasks[i]=[])).push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.headerForm.get('values')[i].controls['tasks'].setValue(null);
  }

  remove(task: string, i: number): void {
    const index = this.tasks[i].indexOf(task);

    if (index >= 0) {
      this.tasks[i].splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, i: number): void {
    (this.tasks[i] || (this.tasks[i] = [])).push(event.option.viewValue);
    this.taskInput.nativeElement.value = '';
    // console.log(i);
    // console.log(this.headerForm.get('values').controls[i])
    console.log(this.headerForm.get('values').value)
    // this.headerForm.get('values').controls[i].controls['tasks'].setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTasks.filter(task => task.toLowerCase().indexOf(filterValue) === 0);
  }
  
}
