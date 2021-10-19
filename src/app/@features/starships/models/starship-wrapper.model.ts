import {Starship} from "./starship.model";

export interface StarshipWrapper {
  count: number
  next?: string
  previous?: string
  results: Starship[]
}
