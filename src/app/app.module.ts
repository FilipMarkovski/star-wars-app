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
import {PeopleDetailComponent} from './@features/people/components/people-detail/people-detail.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MaterialModule} from "./material.module";
import {AuthModule} from "./auth/auth.module";
import {SharedModule} from "./@shared/shared.module";
import {AggregateService} from "./@shared/services/aggregate.service";
import { FilmDetailComponent } from './@features/films/components/film-detail/film-detail.component';
import {FilmService} from "./@features/films/services/film.service";
import {PlanetsService} from "./@features/planets/services/planets.service";
import {SpeciesService} from "./@features/species/services/species.service";
import {StarshipsService} from "./@features/starships/services/starships.service";
import {VehiclesService} from "./@features/vehicles/services/vehicles.service";
import { PlanetDetailComponent } from './@features/planets/components/planet-detail/planet-detail.component';
import { SpeciesDetailComponent } from './@features/species/components/species-detail/species-detail.component';
import { StarshipDetailComponent } from './@features/starships/components/starship-detail/starship-detail.component';
import { VehicleDetailComponent } from './@features/vehicles/components/vehicle-detail/vehicle-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    PeopleDetailComponent,
    FilmDetailComponent,
    PlanetDetailComponent,
    SpeciesDetailComponent,
    StarshipDetailComponent,
    VehicleDetailComponent
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
  providers: [BaseService, PeopleService, FilmService, PlanetsService, SpeciesService, StarshipsService, VehiclesService, AggregateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
