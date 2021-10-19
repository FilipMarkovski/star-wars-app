import {Injectable} from '@angular/core';
import {BaseService} from "../../../@shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {FilmWrapper} from "../models/film-wrapper.model";
import {Film} from "../models/film.model";

const api = 'https://swapi.dev/api/films';

@Injectable()
export class FilmService extends BaseService<FilmWrapper,Film> {
  constructor(public http: HttpClient) {
    super(http, api);
  }
}
