import { Injectable } from '@angular/core';
import {Credentials, CredentialsService} from "./credentials.service";
import {Observable, of} from "rxjs";

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private credentialsService: CredentialsService) { }

  login(context: LoginContext): Observable<Credentials> {
    const data = {
      username: context.username,
      token: '123456'
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  logout(): Observable<boolean> {
    this.credentialsService.setCredentials();
    return of(true);
  }
}
