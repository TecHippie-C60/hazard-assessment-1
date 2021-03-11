import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  token;

  companyForm: FormGroup;
  hazardsForm: FormGroup;

  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

  constructor(
    private router: Router,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.companyForm = this.formBuilder.group({
      date: [''],
      company: [''],
      location: [''],
      musterPoint: [''],
      jobNumber: [''],
      ppeInspection: ['']
    });
    // this.hazards = this.formBuilder.group({
    //   tasks: [''],
    //   hazards: ['']

    // })
    this.hazardsForm = this.formBuilder.group ({
      values: this.formBuilder.array([
      this.formBuilder.group({
        tasks: [''],
        hazards: [''],
        severity: [''],
        probability: ['']
      })
    ]) 
  });
  }

  ngOnInit(): void {
    // this.authService.token().subscribe(token => {
    //   this.token = token;
    //   localStorage.setItem('formToken', this.token.token);
    // });
  }

  goPIN() {
    this.router.navigate(['admin']);
  }

}
