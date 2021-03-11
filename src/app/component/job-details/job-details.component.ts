import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  @Input() jobDetailForm;

  constructor() { }

  ngOnInit(): void {
  }

}
