import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdbPersistenceService {

  private hazardAssessmentDB;

  async connect(): Promise<void> {
    this.hazardAssessmentDB = await openDB('hazardAssessmentDB', 1, {
      upgrade(db) {
        db.createObjectStore('form', { keyPath: 'id', autoIncrement: true }) // form structure
        db.createObjectStore('data', { keyPath: 'id', autoIncrement: true }) // form data
        db.createObjectStore('prefs', { keyPath: 'id', autoIncrement: false }) // preferences
        db.createObjectStore('list_data', { keyPath: 'id', autoIncrement: true }) // list data
      }
    });
  }

  read(storeName: string, key): Observable<any> {
    return from(this.hazardAssessmentDB.get(storeName, key));
  }

  readAll(storeName: string): Observable<any> {
    return from(this.hazardAssessmentDB.getAll(storeName));
  }

  add(storeName: string, item: any): Observable<any> {
    return from(this.hazardAssessmentDB.add(storeName, item));
  }
  
  // update, create for auto-increment store
  put(storeName: string, item: any): Observable<any> {
    return from(this.hazardAssessmentDB.put(storeName, item));
  }

  delete(storeName: string, key: any): Observable<any> {
    return from(this.hazardAssessmentDB.delete(storeName, key));
  }

  clear(storeName: string): Observable<any> {
    return from(this.hazardAssessmentDB.clear(storeName));
  }

}

