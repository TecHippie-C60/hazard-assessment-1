import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { ErrorService } from "../../service/error.service"

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

  auth
  token

  idForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private errorService: ErrorService) { 
    this.idForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  goHome() {
    this.authService.loginStatus = false
    this.appService.isID = false
  }

  save() {
    
  }

}

