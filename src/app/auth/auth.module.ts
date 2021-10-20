import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {MaterialModule} from "../material.module";
import {AuthRoutingModule} from "./auth-routing.module";
import {LoginComponent} from './login.component';
import {SharedModule} from "../@shared/shared.module";
import {MovieIntroComponent} from "../@shared/components/movie-intro/movie-intro.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AuthRoutingModule,
    SharedModule,
  ],
  declarations: [LoginComponent, MovieIntroComponent]
})
export class AuthModule {
}
