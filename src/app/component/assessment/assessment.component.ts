import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  @Input() page;
  
  constructor() { }

  ngOnInit(): void {
  }

}
