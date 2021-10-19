import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Film} from "../../models/film.model";
import {ActivatedRoute} from "@angular/router";
import {FilmService} from "../../services/film.service";
import {filter, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  item$: Observable<Film>;
  @Input() isLoading: boolean;

  constructor(private route: ActivatedRoute, private filmService: FilmService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.item$ = this.route.paramMap.pipe(
      filter((params: any) => !!params.get('id')),
      switchMap((params) => {
        const id = params.get('id');
        return this.filmService.fetchById(id);
      }),
      tap(() => {
        this.isLoading = false;
      })
    );
  }

}
