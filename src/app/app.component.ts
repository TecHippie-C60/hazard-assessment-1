import { Component, HostBinding, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from "./service/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'assessment';

  tenantID

  constructor(
    private route: ActivatedRoute,
    public appService: AppService) {
      this.appService.tenantID = this.route.snapshot.params.tenantID;
      
  }
  ngOnInit() {
    this.appService.initConfig();
  }



}
