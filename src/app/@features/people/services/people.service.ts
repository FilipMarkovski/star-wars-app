import {Injectable} from '@angular/core';
import {BaseService} from "../../../@shared/services/base.service";
import {People} from "../models/people.model";
import {HttpClient} from "@angular/common/http";
import {PeopleWrapper} from "../models/people-wrapper.model";

const api = 'https://swapi.dev/api/people';

@Injectable()
export class PeopleService extends BaseService<PeopleWrapper,People> {
  constructor(public http: HttpClient) {
    super(http, api);
  }
}
