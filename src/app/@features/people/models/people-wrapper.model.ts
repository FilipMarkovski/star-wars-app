import {People} from "./people.model";

export interface PeopleWrapper {
  count: number
  next?: string
  previous?: string
  results: People[]
}
