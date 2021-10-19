import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {BaseWrapper} from "../models/base.model";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T,U> {

  constructor(public http: HttpClient, @Inject(String) private baseUrl: string) {}

  // fetch(): Observable<T> {
  //   return this.http.get<any>(this.baseUrl).pipe(
  //     tap((result) => console.log(result))
  //   );
  // }

  fetchByPage(page: any): Observable<T> {
    let params = new HttpParams().set('page', page);

    return this.http.get<T>(this.baseUrl, { params: params });
  }

  fetchById(id: string): Observable<U> {
    return this.http.get<U>(`${this.baseUrl}/${id}`);
  }

}
