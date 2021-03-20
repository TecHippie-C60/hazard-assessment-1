import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { OverlayContainer } from '@angular/cdk/overlay'

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleTheme = new EventEmitter();

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
  }

  signin() {
    this.appService.isPin = true;
  }

  signout() {
    this.appService.isPin = false;
    this.appService.isSignin = false;
  }

  changeTheme(event) {
    this.toggleTheme.emit();
  }

}
