import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {forkJoin, fromEvent, Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import { apiUrls } from '../@shared';
import {BaseService} from "../@shared/services/base.service";
import {merge} from 'rxjs';
import {BaseWrapper} from "../@shared/models/base.model";
import {AggregateService} from "../@shared/services/aggregate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('swapiSearchInput', { static: true }) swapiSearchInput: ElementRef;
  apiResponse: any[];
  isSearching: boolean;

  list$: any;

  constructor(private aggregateService: AggregateService, private router: Router) {
    this.isSearching = false;
    this.apiResponse = [];

    console.log(this.swapiSearchInput);
  }

  ngOnInit(): void {
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
    let observables = apiUrls.map(api => this.aggregateService.fetchResourceWithSearchTerm(api, term)); // get an array of observables
    return observables.reduce((previous, current) => merge(previous, current), of({})); // merge all observable in the list into one.
  }

  action(data: { url: string }): void {
    const splittedUrl = data.url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];
    this.router.navigate(['/people', id]);
  }

}
