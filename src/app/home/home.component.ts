import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {forkJoin, fromEvent, Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, tap} from "rxjs/operators";
import { apiUrls } from '../@shared';
import {BaseService} from "../@shared/services/base.service";
import {merge} from 'rxjs';
import {BaseWrapper} from "../@shared/models/base.model";
import {AggregateService} from "../@shared/services/aggregate.service";
import {Router} from "@angular/router";

import {People} from "../@features/people/models/people.model";
import {PeopleWrapper} from "../@features/people/models/people-wrapper.model";
import {PeopleService} from "../@features/people/services/people.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('swapiSearchInput', { static: true }) swapiSearchInput: ElementRef;
  apiResponse: any[];
  isSearching: boolean;

  @Input() isLoading: boolean;

  list$: Observable<any[]>;

  page: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  isPageable: boolean;

  shouldLoadContainer: boolean;

  constructor(
    private aggregateService: AggregateService,
    private router: Router,
    private peopleService: PeopleService
  ) {
    this.isSearching = false;
    this.apiResponse = [];

    console.log(this.swapiSearchInput);
  }

  ngOnInit(): void {
    this.shouldLoadContainer = false;
    console.log(this.swapiSearchInput);

    fromEvent(this.swapiSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length > 2),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.apiResponse = [];
      this.searchGetCall(text).subscribe((res: any[]) => {
        // console.log('res', res);
        this.isSearching = false;

        if (res.length == 1) {
          this.apiResponse.push(res[0]);
        } else if (res.length > 1) {
          res.forEach((element) => {
            // console.log('element:', element);
            this.apiResponse.push(element);
          });
        }
      }, (err: any) => {
        this.isSearching = false;
        console.log('error', err);
      });
    });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    this.isPageable = false;
    let observables: Observable<any>[] = [];
    // let observables = apiUrls.map(api => this.aggregateService.fetchResourceWithSearchTerm(api['url'], term)); // get an array of observables

    apiUrls.forEach((value) => {
      observables.push(this.aggregateService.fetchResourceWithSearchTerm(value, term));
    })

    return observables.reduce((previous, current) => merge(previous, current), of({})); // merge all observable in the list into one.
  }

  action(data: { url: string }): void {
    console.log('data: ', data);
    console.log('this.router.url: ', this.router.url);
    const splittedUrl = data.url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];
    this.router.navigate(['/people', id]);
    this.shouldLoadContainer = true;
  }

  fetchResource(resource: string) {
    resource = resource.toLowerCase();
    this.isPageable = true;

    // if (apiUrls.has(resource)) {
    //   this.getPage(1);
    // }

    switch (resource) {
      case 'people':
        this.list$ = new Observable<People[]>();
        this.getPage(1);
        break;
      case 'films':
      case 'starships':
      case 'vehicles':
      case 'species':
      case 'planets':
        console.log('Not yet implemented');
    }
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

  serverCall(page: number): Observable<PeopleWrapper> {
    return this.peopleService.fetchByPage(page);
  }

}
