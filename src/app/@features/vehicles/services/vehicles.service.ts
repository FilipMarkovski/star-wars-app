import {Injectable} from '@angular/core';
import {BaseService} from "../../../@shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {VehicleWrapper} from "../models/vehicle-wrapper.model";
import {Vehicle} from "../models/vehicle.model";

const api = 'https://swapi.dev/api/vehicles';

@Injectable()
export class VehiclesService extends BaseService<VehicleWrapper,Vehicle> {
  constructor(public http: HttpClient) {
    super(http, api);
  }
}
