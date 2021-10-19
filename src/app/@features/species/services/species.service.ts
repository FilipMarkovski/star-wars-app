import {Injectable} from '@angular/core';
import {BaseService} from "../../../@shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {SpeciesWrapper} from "../models/species-wrapper.model";
import {Species} from "../models/species.model";

const api = 'https://swapi.dev/api/species';

@Injectable()
export class SpeciesService extends BaseService<SpeciesWrapper,Species> {
  constructor(public http: HttpClient) {
    super(http, api);
  }
}
