import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {People} from "../models/people.model";
import {Router} from "@angular/router";
import {PeopleService} from "../services/people.service";

@Component({
  selector: 'app-people',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit {
  list$: Observable<People[]>;

  constructor(private router: Router, private peopleService: PeopleService) {
  }

  ngOnInit() {
    console.log('people page');
    this.list$ = this.peopleService.fetch();
  }

  action(data: { url: string }): void {
    const splittedUrl = data.url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];
    this.router.navigate(['/people', id]);
  }
}
