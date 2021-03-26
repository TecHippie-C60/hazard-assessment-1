import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { IdbCrudService } from "../service-idb/idb-crud.service";

import { LookupList } from '../model/lookup-list';

import * as uuid from 'uuid';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';

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
  public listData ;
  public formData;

  apiUrl = environment.apiUrl;
  pinKeySecret = environment.pinKeySecret;
  lookupList = LookupList;
  constructor(
    private _http: HttpClient,
    private idbCrudService: IdbCrudService
  ) {
    this.listData = new BehaviorSubject([{}]);
   }

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
    this.idbCrudService.readAll('form').subscribe((forms) => {
      this.lookupLists = forms;
      // console.log(this.lookupLists);
    });
  }

  initConfig() {
    this.lookupLists = [];
    this.idbCrudService.readAll('form').subscribe((forms) => {
      const lists = environment.lists;
      this.lookupLists = forms;
      
      if(this.lookupLists.filter(e => { return e.form.name == Object.keys(lists)[0]}).length ==0)
      {
        for(const [name, data] of Object.entries(lists))
        {
          let idbForm = this.createList(name);
          this.idbCrudService.put('form', idbForm).subscribe(id => {
            let dataArray = data.map(val => {
              return {
                item: val,
                user_created: { email: 'polly@formloco.com', date_created: new Date() },
                date_archived: undefined,
                date_created: new Date()
              }  
            });
    
            let obj = {
              form_id: idbForm.form_id,
              name: name,
              tenant_id: undefined,
              columns: idbForm.form.columns,
              data: dataArray
            }
            this.idbCrudService.put('list_data', obj).subscribe(data =>{
              this.getIdbLists();
            });
          })
        }
         
      }
      else
      {
        this.getIdbLists();
      }
    });
    

  }

  createList(listName) {
    this.lookupList.form.name = listName;
    let userCreated = { email: 'polly@formloco.com', date_created: new Date() }
    let sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
    let pin = CryptoJS.AES.encrypt(JSON.stringify(sixdigitsrandom + 'true'), this.pinKeySecret).toString();

    let idbForm = ({
      form: this.lookupList.form,
      form_id: uuid.v4(),
      pin: pin,
      columns: this.lookupList.form.columns,
      date_created: new Date(),
      date_archived: undefined,
      date_last_access: new Date(),
      user_created: userCreated,
      user_archived: null,
      is_data: false,
      is_published: true
    });
    return idbForm;
  }

  getIdbLists() {
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.listData.next(data);
    })
  }
  getListData(): Observable<any> {
    return this.listData.asObservable();
  }

  saveFormData(obj) {
    return this.idbCrudService.put('data', obj);
  }

  getFormData()
  {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.formData = data;
    })
  }
}
