import { Component, OnInit } from '@angular/core';
import {People} from "../../models/people.model";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PeopleService} from "../../services/people.service";
import {filter, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements OnInit {

  item$: Observable<People>;

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.item$ = this.route.paramMap.pipe(
      filter((params: any) => !!params.get('id')),
      switchMap((params) => {
        const id = params.get('id');
        return this.peopleService.fetchById(id);
      })
    );
  }

}
