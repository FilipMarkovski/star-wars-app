import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './@shared/components/list/list.component';
import {HttpClientModule} from "@angular/common/http";
import {BaseService} from "./@shared/services/base.service";
import {PeopleService} from "./@features/people/services/people.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {PeoplePageComponent} from './@features/people/pages/people-page.component';
import {PeopleDetailComponent} from './@features/people/components/people-detail/people-detail.component';
import {NgxPaginationModule} from "ngx-pagination";
import {LoginComponent} from './auth/login.component';
import {MaterialModule} from "./material.module";
import {AuthModule} from "./auth/auth.module";
import {SharedModule} from "./@shared/shared.module";
import {AggregateService} from "./@shared/services/aggregate.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    PeoplePageComponent,
    PeopleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxPaginationModule,
    SharedModule,
    AuthModule
  ],
  providers: [BaseService, PeopleService, AggregateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
