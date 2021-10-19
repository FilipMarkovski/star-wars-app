import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Species} from "../../models/species.model";
import {filter, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {SpeciesService} from "../../services/species.service";

@Component({
  selector: 'app-species-detail',
  templateUrl: './species-detail.component.html',
  styleUrls: ['./species-detail.component.scss']
})
export class SpeciesDetailComponent implements OnInit {

  item$: Observable<Species>;
  @Input() isLoading: boolean;

  constructor(private route: ActivatedRoute, private speciesService: SpeciesService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.item$ = this.route.paramMap.pipe(
      filter((params: any) => !!params.get('id')),
      switchMap((params) => {
        const id = params.get('id');
        return this.speciesService.fetchById(id);
      }),
      tap(() => {
        this.isLoading = false;
      })
    );
  }

}
