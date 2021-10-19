import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Starship} from "../../models/starship.model";
import {ActivatedRoute} from "@angular/router";
import {StarshipsService} from "../../services/starships.service";
import {filter, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss']
})
export class StarshipDetailComponent implements OnInit {

  item$: Observable<Starship>;
  @Input() isLoading: boolean;

  constructor(private route: ActivatedRoute, private starshipsService: StarshipsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.item$ = this.route.paramMap.pipe(
      filter((params: any) => !!params.get('id')),
      switchMap((params) => {
        const id = params.get('id');
        return this.starshipsService.fetchById(id);
      }),
      tap(() => {
        this.isLoading = false;
      })
    );
  }

}
