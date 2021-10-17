import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  constructor(public http: HttpClient, @Inject(String) private baseUrl: string) {}

  fetch(): Observable<T[]> {
    console.log('fetching...');
    return this.http.get<{ results: T[] }>(this.baseUrl).pipe(
      map((response) => response.results),
      tap((result) => console.log(result))
    );
  }

  fetchById(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`).pipe(tap((response) => console.log(response)));
  }

}
