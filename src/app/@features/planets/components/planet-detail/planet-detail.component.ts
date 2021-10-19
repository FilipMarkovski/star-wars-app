import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Planet} from "../../models/planet.model";
import {ActivatedRoute} from "@angular/router";
import {PlanetsService} from "../../services/planets.service";
import {filter, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {

  item$: Observable<Planet>;
  @Input() isLoading: boolean;

  constructor(private route: ActivatedRoute, private planetsService: PlanetsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.item$ = this.route.paramMap.pipe(
      filter((params: any) => !!params.get('id')),
      switchMap((params) => {
        const id = params.get('id');
        return this.planetsService.fetchById(id);
      }),
      tap(() => {
        this.isLoading = false;
      })
    );
  }

}
