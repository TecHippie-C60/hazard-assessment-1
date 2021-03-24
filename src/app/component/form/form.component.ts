import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  token;

  isRightMenu = false;
  isLookuplist = false;
  
  companyForm: FormGroup;
  hazardsForm: FormGroup;
  jobDetailForm: FormGroup;
  workersForm: FormGroup;

  myInnerHeight = window.innerHeight;

  constructor(
    private router: Router,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
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
        severity: ['', Validators.required],
        probability: ['', Validators.required]
      })
    ]) 
  });
  this.jobDetailForm = this.formBuilder.group({
    isPreInspectionComplete: [''],
    isWorkingAlone: [''],
    commentOnWorkingAlone: [''],
    warningRibbonNeeded: [''],
    allPermitsClosedOut: ['NA'],
    areaCleanedUp: ['NA'],    
    hazardsRemaining: [''],
    commentOnRemainingHazards: [''],
    anyIncidents: [''],
    commentOnIncidents: ['']
  });
  this.workersForm = this.formBuilder.group({
    workers: this.formBuilder.array([
      this.formBuilder.group({
        name: ['']
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
  submitForm()
  {
    let formValues = {
      'company': this.companyForm.value,
      'hazards': this.hazardsForm.value
    }
    
    this.appService.saveFormData(formValues);
    
    this.companyForm.reset();
    this.hazardsForm.reset();
    this._snackBar.open("Form Submitted!", '',{
      duration: 3000,
      verticalPosition: 'top'

    });
    
  }
  openLists() {
    this.isLookuplist = true;
    this.isRightMenu = !this.isRightMenu;
  }

}
