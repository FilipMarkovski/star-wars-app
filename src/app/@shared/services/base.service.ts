import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T,U> {

  constructor(public http: HttpClient, @Inject(String) private baseUrl: string) {}

  // fetch(): Observable<T[]> {
  //   return this.http.get<{ results: T[] }>(this.baseUrl).pipe(
  //     map((response) => response.results),
  //     tap((result) => console.log(result))
  //   );
  // }

  fetch(): Observable<T> {
    return this.http.get<any>(this.baseUrl).pipe(
      tap((result) => console.log(result))
    );
  }

  fetchByPage(page: any): Observable<T> {
    let params = new HttpParams().set('page', page);

    return this.http.get<T>(this.baseUrl, { params: params }).pipe(
      tap((result) => console.log(result))
    );
  }

  fetchRestOfResources(totalCount: any): Observable<T> {
    let params = new HttpParams().set('offset', totalCount);

    return this.http.get<T>(this.baseUrl, { params: params }).pipe(
      tap((result) => console.log(result))
    );
  }

  gty(page: any): any {
    let params = new HttpParams().set('page', page);
    return this.http.get<any>(this.baseUrl, { params: params }).pipe(
      tap((result) => console.log(result))
    );
  }

  fetchById(id: string): Observable<U> {
    return this.http.get<U>(`${this.baseUrl}/${id}`).pipe(tap((response) => console.log(response)));
  }

}
