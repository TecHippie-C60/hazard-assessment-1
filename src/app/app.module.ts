import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpConfig} from './interceptor/httpconfig.interceptor'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'

// security & anonomous route
import { PinComponent } from './component/pin/pin.component'
import { AdminComponent } from './component/admin/admin.component'
import { HeaderComponent } from './component/header/header.component'
import { LayoutComponent } from './component/layout/layout.component'
import { FooterComponent } from './component/footer/footer.component'
import { DesktopComponent } from './component/desktop/desktop.component'

// admin
import { DataComponent } from './component/data/data.component'
import { ListRunComponent } from './component/list-run/list-run.component'
import { FormListsComponent } from './component/form-lists/form-lists.component'
import { IdentificationComponent } from './component/identification/identification.component'

// form
import { FormComponent } from './component/form/form.component'
import { TaskComponent } from './component/form/task/task.component'
import { CompanyComponent } from './component/form/company/company.component'
import { WorkersComponent } from './component/form/workers/workers.component'
import { SignOffComponent } from './component/form/sign-off/sign-off.component'
import { JobDetailsComponent } from './component/form/job-details/job-details.component'

import { MaterialModule } from "./material.module"

import { AuthService } from './service/auth.service'
import { AuthGuard } from './service/auth-guard.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//indexDB
import { IdbPersistenceService } from './service-idb/idb-persistence.service'

@NgModule({
  declarations: [
    AppComponent,
    PinComponent,
    FormComponent,
    DataComponent,
    TaskComponent,
    AdminComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    ListRunComponent,
    CompanyComponent,
    WorkersComponent,
    DesktopComponent,
    SignOffComponent,
    FormListsComponent,
    JobDetailsComponent,
    IdentificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports:[
    PinComponent,
    FormComponent,
    DataComponent,
    TaskComponent,
    AdminComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    ListRunComponent,
    CompanyComponent,
    WorkersComponent,
    DesktopComponent,
    SignOffComponent,
    FormListsComponent,
    JobDetailsComponent,
    IdentificationComponent
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfig,
      multi: true
    },
    { provide: APP_INITIALIZER,
      useFactory: (idbPersistenceService: IdbPersistenceService) => () => idbPersistenceService.connect(),
      deps: [IdbPersistenceService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
