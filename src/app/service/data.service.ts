import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppService } from "../service/app.service";
import { BuilderService } from "../service/builder.service";
import { IdbCrudService } from "../service-idb/idb-crud.service";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  idbData;

  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    public appService: AppService,
    public builderService: BuilderService,
    private idbCrudService: IdbCrudService) { }

  save(obj) {
    return this._http.post(this.apiUrl, obj);
  }

  getData(obj) {
    return this._http.get(this.apiUrl + obj.tenant_id + '/' + obj.form_id);
  }

  openIdbData(formObj) {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.idbData = data;
      this.idbData = this.idbData.filter(
        data => data.form_id === formObj.form_id
      );
      this.builderService.formObj = formObj;
    });
  }

}
