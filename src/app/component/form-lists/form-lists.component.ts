import { Component, OnInit, EventEmitter } from '@angular/core';

import * as uuid from 'uuid';
import * as CryptoJS from 'crypto-js';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { DataService } from "../../service/data.service";
import { BuilderService } from "../../service/builder.service";
import { IdbCrudService } from "../../service-idb/idb-crud.service";

import { environment } from '../../../environments/environment';

import { LookupList } from '../../model/lookup-list';

@Component({
  selector: 'app-form-lists',
  templateUrl: './form-lists.component.html',
  styleUrls: ['./form-lists.component.scss']
})
export class FormListsComponent implements OnInit {

  isLookupOpen = false;
  fileArray = [];

  lookupList = LookupList;

  lookupListForm: FormGroup;

  pinKeySecret = environment.pinKeySecret;

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    public builderService: BuilderService,
    private idbCrudService: IdbCrudService) {
    this.lookupListForm = this.formBuilder.group({
      lookupListName: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  createLookuplist() {
    let listName = this.lookupListForm.get('lookupListName').value;
    let idbForm = this.appService.createList(listName);
    this.idbCrudService.put('form', idbForm).subscribe(id => {
      this.fileArray = [];
      this.closeOverlay();
      this.lookupListForm.reset();
      this.appService.getForms();
    });
  }

  run(formObj) {
    // console.log(formObj)
    this.appService.formObj = formObj;
    this.appService.isData = false;
  }

  closeOverlay() {
    this.isLookupOpen = false;
  }

  openRun() {
    
  }

}
