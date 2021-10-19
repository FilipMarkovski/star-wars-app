import {Species} from "./species.model";

export interface SpeciesWrapper {
  count: number
  next?: string
  previous?: string
  results: Species[]
}
