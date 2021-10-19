export * from './logger.service';
export * from '@ngneat/until-destroy';

// interface ApiKeys {
//   [key: string]: string;
// }

// export const apiUrls: { key: string, url: string}[] = [
//   { key: 'people',    url: 'https://swapi.dev/api/people' },
//   { key: 'films',     url: 'https://swapi.dev/api/films' },
//   { key: 'starships', url: 'https://swapi.dev/api/starships' },
//   { key: 'vehicles',  url: 'https://swapi.dev/api/vehicles' },
//   { key: 'species',   url: 'https://swapi.dev/api/species' },
//   { key: 'planets',   url: 'https://swapi.dev/api/planets' }
// ];

export const apiUrls: Map<string, string> = new Map([
  [ 'people', 'https://swapi.dev/api/people'],
  [ 'films', 'https://swapi.dev/api/films'],
  [ 'starships', 'https://swapi.dev/api/starships'],
  [ 'vehicles', 'https://swapi.dev/api/vehicles'],
  [ 'species', 'https://swapi.dev/api/species'],
  [ 'planets', 'https://swapi.dev/api/planets'],
]);
