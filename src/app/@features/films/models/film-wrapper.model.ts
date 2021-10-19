import {Film} from "./film.model";

export interface FilmWrapper {
  count: number
  next?: string
  previous?: string
  results: Film[]
}
