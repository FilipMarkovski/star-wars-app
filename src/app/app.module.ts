import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './@shared/components/list/list.component';
import {HttpClientModule} from "@angular/common/http";
import {BaseService} from "./@shared/services/base.service";
import {PeopleService} from "./@features/people/services/people.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { PeoplePageComponent } from './@features/people/pages/people-page.component';
import { PeopleDetailComponent } from './@features/people/components/people-detail/people-detail.component';

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
    MatListModule,
    MatCardModule
  ],
  providers: [BaseService, PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
