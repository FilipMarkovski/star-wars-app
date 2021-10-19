import {Injectable} from '@angular/core';
import {BaseService} from "../../../@shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {StarshipWrapper} from "../models/starship-wrapper.model";
import {Starship} from "../models/starship.model";

const api = 'https://swapi.dev/api/starships';

@Injectable()
export class StarshipsService extends BaseService<StarshipWrapper,Starship> {
  constructor(public http: HttpClient) {
    super(http, api);
  }
}
