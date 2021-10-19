import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PeopleDetailComponent} from "./@features/people/components/people-detail/people-detail.component";
import {AuthenticationGuard} from "./auth/authentication.guard";
import {FilmDetailComponent} from "./@features/films/components/film-detail/film-detail.component";
import {PlanetDetailComponent} from "./@features/planets/components/planet-detail/planet-detail.component";
import {SpeciesDetailComponent} from "./@features/species/components/species-detail/species-detail.component";
import {StarshipDetailComponent} from "./@features/starships/components/starship-detail/starship-detail.component";
import {VehicleDetailComponent} from "./@features/vehicles/components/vehicle-detail/vehicle-detail.component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthenticationGuard],
    children: [
      { path: '',
        component: HomeComponent,
        children: [
          { path: 'people/:id', component: PeopleDetailComponent },
          { path: 'films/:id', component: FilmDetailComponent },
          { path: 'planets/:id', component: PlanetDetailComponent },
          { path: 'species/:id', component: SpeciesDetailComponent },
          { path: 'starships/:id', component: StarshipDetailComponent },
          { path: 'vehicles/:id', component: VehicleDetailComponent },
        ]
      },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
