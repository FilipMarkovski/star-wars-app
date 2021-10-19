import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PeoplePageComponent} from "./@features/people/pages/people-page.component";
import {PeopleDetailComponent} from "./@features/people/components/people-detail/people-detail.component";
import {AuthenticationGuard} from "./auth/authentication.guard";

const routes: Routes = [
  { path: '',
    canActivate: [AuthenticationGuard],
    children: [
      { path: '',
        component: HomeComponent,
        children: [
          { path: 'people/:id', component: PeopleDetailComponent }
        ]
      },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
