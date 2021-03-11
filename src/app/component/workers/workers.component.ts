import { Component, OnInit, Input } from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  @Input() workersForm;
  workers:FormArray;
  
  constructor(private formBuilder: FormBuilder) {   }
 

  ngOnInit(): void {
    this.workers = this.workersForm.get('workers');
  }
  addWorkers() {
    this.workersForm.get('workers').push(this.formBuilder.group({
      name: ['']
    }))
  }

}
