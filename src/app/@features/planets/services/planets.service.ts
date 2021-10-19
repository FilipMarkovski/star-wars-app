import {Injectable} from '@angular/core';
import {BaseService} from "../../../@shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {PlanetWrapper} from "../models/planet-wrapper.model";
import {Planet} from "../models/planet.model";

const api = 'https://swapi.dev/api/planets';

@Injectable()
export class PlanetsService extends BaseService<PlanetWrapper,Planet> {
  constructor(public http: HttpClient) {
    super(http, api);
  }
}
