import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, tap} from "rxjs/operators";
import { apiUrls } from '../@shared';
import {merge} from 'rxjs';
import {AggregateService} from "../@shared/services/aggregate.service";
import {Router} from "@angular/router";

import {People} from "../@features/people/models/people.model";
import {Film} from "../@features/films/models/film.model";
import {Planet} from "../@features/planets/models/planet.model";
import {Starship} from "../@features/starships/models/starship.model";
import {Vehicle} from "../@features/vehicles/models/vehicle.model";
import {Species} from "../@features/species/models/species.model";

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

  currentResource: string = '';

  constructor(
    private aggregateService: AggregateService,
    private router: Router
  ) {
    this.isSearching = false;
    this.apiResponse = [];
  }

  ngOnInit(): void {
    this.shouldLoadContainer = false;

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

        this.isSearching = false;
        if (res.length == 1) {
          this.apiResponse.push(res[0]);
        } else if (res.length > 1) {
          res.forEach((element) => {
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

    apiUrls.forEach((value) => {
      observables.push(this.aggregateService.fetchResourceWithSearchTerm(value, term)); // get an array of observables
    })

    return observables.reduce((previous, current) => merge(previous, current), of({})); // merge all observable in the list into one.
  }

  action(data: { url: string }): void {
    const splittedUrl = data.url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];
    this.currentResource = splittedUrl[splittedUrl.length - 3];
    this.router.navigate([`/${this.currentResource}`, id]);
    this.shouldLoadContainer = true;
  }

  fetchResource(resource: string) {
    resource = resource.toLowerCase();
    this.isPageable = true;
    this.currentResource = resource;

    switch (resource) {
      case 'people':
        this.list$ = new Observable<People[]>();
        this.getPage(1);
        break;
      case 'films':
        this.list$ = new Observable<Film[]>();
        this.getPage(1);
        break;
      case 'starships':
        this.list$ = new Observable<Starship[]>();
        this.getPage(1);
        break;
      case 'vehicles':
        this.list$ = new Observable<Vehicle[]>();
        this.getPage(1);
        break;
      case 'species':
        this.list$ = new Observable<Species[]>();
        this.getPage(1);
        break;
      case 'planets':
        this.list$ = new Observable<Planet[]>();
        this.getPage(1);
        break;
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

  serverCall(page: number): Observable<any> {
    let baseUrl = apiUrls.get(this.currentResource)!;
    return this.aggregateService.fetchByPage(baseUrl, page);
  }

}
