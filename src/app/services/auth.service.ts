import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthorizationRequest } from './AuthorizationRequest';
import { AuthorizationResponse } from './AuthorizationResponse';
import { User } from '../domain/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL   = environment.BASE_URL + "/auth";
  private _jwt$      = new BehaviorSubject<string>("");
  private _user$     = new BehaviorSubject<User>({ username : "" });
  private _loggedin$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http : HttpClient,
  ) { }
  
  authenticate(request : AuthorizationRequest) {
    const status = new Subject<{ username : string, jwt : string }>();

    this.http.post<AuthorizationResponse>(this.BASE_URL, request).subscribe((response) => {
      this._jwt$.next(response.jwt);
      this._user$.next({ username: request.username });
      this._loggedin$.next(true);
      
      status.next({ username : request.username, jwt : response.jwt});
      status.complete();

      //
      
      console.log(response.jwt);
    }, (err) => {
      this.desauthenticate();

      status.error("invalid username or password");

      console.error(err);
    });

    return status;
  }

  desauthenticate() {
    this._jwt$.next("");
    this._user$.next({ username: "" });
    this._loggedin$.next(false);
  }

  get user$() {
    return this._user$.asObservable();
  }

  get loggedin$() {
    return this._loggedin$.asObservable();
  }

  get jwt() {
    return this._jwt$.getValue();
  }

  get user() {
    return this._user$.getValue();
  }

  get loggedin() {
    return this._loggedin$.getValue();
  }
}
