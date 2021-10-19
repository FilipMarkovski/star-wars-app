import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {People} from "../models/people.model";
import {Router} from "@angular/router";
import {PeopleService} from "../services/people.service";
import {delay, filter, map, tap} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {PeopleWrapper} from "../models/people-wrapper.model";

@Component({
  selector: 'app-people',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit {
  list$: Observable<People[]>;

  page: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;

  @Input() isLoading: boolean;
  shouldLoadContainer: boolean;

  constructor(private router: Router, private peopleService: PeopleService) {}

  ngOnInit() {
    this.shouldLoadContainer = false;
    this.getPage(1);
  }

  action(data: { url: string }): void {
    const splittedUrl = data.url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];
    this.router.navigate(['/people', id]);
    this.shouldLoadContainer = true;
  }

  getPage(page: number): void {
    this.isLoading = true;
    this.list$ = this.serverCall(page).pipe(
      tap(res => {
        this.totalItems = res.count;
        this.page = page;
        this.isLoading = false;
      }),
      map(res => res.results)
    );
  }

  /**
   * Simulate an async HTTP call with a delayed observable.
   */
  serverCall(page: number): Observable<PeopleWrapper> {
    return this.peopleService.fetchByPage(page);
  }

}
