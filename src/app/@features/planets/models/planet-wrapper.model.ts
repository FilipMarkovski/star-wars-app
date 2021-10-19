import {Planet} from "./planet.model";

export interface PlanetWrapper {
  count: number
  next?: string
  previous?: string
  results: Planet[]
}
