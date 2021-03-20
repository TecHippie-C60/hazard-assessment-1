import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { ErrorService } from "../../service/error.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  auth;
  token;

  pin = environment.pin;
  pinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private errorService: ErrorService) { 
    this.pinForm = this.fb.group({
      pin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  loginPIN() {
    if (this.appService.tenantID !== undefined) {
      /**
       * Todo: got to server with tenantID and get/sync form data
       * will need to pass form_id found in form model
       */
    }

    if (this.pin == this.pinForm.controls['pin'].value) {
      // this.authService.loginStatus = true;
      this.appService.isSignin = true;
      this.appService.isPin = false;
    }
    else
      this.errorService.popSnackbar('Incorrect PIN');
  }

  goHome() {
    this.authService.loginStatus = false;
    this.appService.isPin = false;
  }

}
