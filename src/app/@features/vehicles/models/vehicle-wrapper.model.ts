import {Vehicle} from "./vehicle.model";

export interface VehicleWrapper {
  count: number
  next?: string
  previous?: string
  results: Vehicle[]
}
