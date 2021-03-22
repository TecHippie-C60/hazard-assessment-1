import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { IdbCrudService } from "../service-idb/idb-crud.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public tenantID;

  public isHeader;
  public isTask;
  public isAssessment;
  public isJobDetail;
  public isWorker;
  public isListMenu;

  public isPin;
  public isSignin;
  public isData = true;
  public isDarkMode = true;
  public canvasBackground;

  public page;
  public forms;
  public formObj;
  public apiLists;
  public lookupLists;

  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private idbCrudService: IdbCrudService
  ) { }

  setPage(page) {
    this.isHeader = false;
    this.isTask = false;
    this.isAssessment = false;
    this.isJobDetail = false;
    this.isWorker = false;

    if (page === 'header') this.isHeader = true;
    if (page === 'task') this.isTask = true;
    if (page === 'assesssment') this.isAssessment = true;
    if (page === 'jobDetail') this.isJobDetail = true;
    if (page === 'worker') this.isWorker = true;

    console.log(this.isHeader,this.isTask)
  }

  create(obj) {
    return this._http.post(this.apiUrl, obj);
  }

  getLists(obj) {
    return this._http.post(this.apiUrl, obj);
  }

  getForms() {
    this.lookupLists = [];
    this.idbCrudService.readAll('form').subscribe(forms => {
      this.lookupLists = forms;
    });
  }

}
