import { Component, OnInit, OnChanges, Input, HostBinding } from '@angular/core'

import * as uuid from 'uuid'

import { OverlayContainer } from '@angular/cdk/overlay'

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms"

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnChanges, OnInit {

  @Input() isDarkMode

  @HostBinding('class') className = 'darkMode'

  myInnerHeight = window.innerHeight

  isPin = false
  isSignin = false
  canvasBackground = '#3b3b3b'

  token
  prefs

  isRightMenu = false
  isLookuplist = false

  constructor(
    private router: Router,
    public appService: AppService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) {

      this.appService.canvasBackground = '#3b3b3b'
      
  }
  
  ngOnInit(): void {
    // this.appService.isID = true
    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs
      console.log(this.prefs)
      let darkClassName = ''

      if (this.prefs.length === 0) {
        darkClassName = 'darkMode'
        this.appService.isID = true
        this.appService.isDarkMode = true
        let obj = {id: uuid.v4(), name: '', dark_mode:this.appService.isDarkMode}
        this.idbCrudService.put('prefs', obj)
      } 
      else {
        if (this.prefs[0]["dark_mode"]) {
          darkClassName = 'darkMode'
          this.appService.isDarkMode = true
        }
        else {
          darkClassName = ''
          this.appService.isDarkMode = false
        }
        this.appService.isID = true
        // if (this.prefs.name === "") {
        //   console.log('got here')
        // }
      }

      this.className = 'darkMode' ? darkClassName : ''
      if ('darkMode') {
        this.overlayContainer.getContainerElement().classList.add(darkClassName)
      } else {
        this.overlayContainer.getContainerElement().classList.remove(darkClassName)
      }
    })

  }

  ngOnChanges(): void {
    if (this.appService.isDarkMode) this.appService.canvasBackground = '#3b3b3b'
    else this.appService.canvasBackground = '#ffffff'
  }

  toggleTheme() {

    let darkClassName = ''

    if (this.appService.isDarkMode) darkClassName = ''
    else darkClassName = 'darkMode'

    this.setMode(darkClassName)

    let obj = { id: 0, dark_mode: !this.appService.isDarkMode }
    this.idbCrudService.put('prefs', obj)

  }

  setMode(darkClassName) {
    this.className = 'darkMode' ? darkClassName : ''

    if (darkClassName === 'darkMode')
      this.overlayContainer.getContainerElement().classList.add(darkClassName)
    else
      this.overlayContainer.getContainerElement().classList.remove('darkMode')
  }

  goPIN() {
    this.appService.isPin = true
  }

  openLists() {
    this.isLookuplist = true
    this.isRightMenu = !this.isRightMenu
  }

}
