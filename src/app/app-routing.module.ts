import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PeoplePageComponent} from "./@features/people/pages/people-page.component";
import {PeopleDetailComponent} from "./@features/people/components/people-detail/people-detail.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'people', component: PeoplePageComponent, children: [
      { path: ':id', component: PeopleDetailComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
