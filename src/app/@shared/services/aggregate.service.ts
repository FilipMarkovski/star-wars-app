import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AggregateService {

  constructor(private http: HttpClient) {}

  fetchResourceWithSearchTerm(resourceUrl: string, term: string) {
    let searchParam = new HttpParams().set('search', term);
    return this.http.get<any>(resourceUrl, { params: searchParam }).pipe(
      map((response) => {
        return response.results;
      })
    );
  }

  fetchByPage(resourceUrl: string, page: any) {
    let params = new HttpParams().set('page', page);

    return this.http.get<any>(resourceUrl, { params: params });
  }

}
