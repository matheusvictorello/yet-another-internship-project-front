import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

import { User } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn$ = new BehaviorSubject<boolean>(true);
  private _username$ = new BehaviorSubject<string>('matheus');
  private _user$ = new BehaviorSubject<User | undefined>({
    id: 1,
    name: "matheus",
    projectIdList:[1,2],
    projects: [],
  });

  constructor(
    private http : HttpClient,
  ) { }

  get loggedIn() {
    return this._loggedIn$.getValue();
  }

  get loggedIn$() {
    return this._loggedIn$.asObservable();
  }

  get username() {
    return this._username$.getValue();
  }

  get username$() {
    return this._username$.asObservable();
  }

  get user() {
    return this._user$.getValue();
  }

  get user$() {
    return this._user$.asObservable();
  }

  login(username : string, password : string) {
    if (username === '') {
      this._loggedIn$.next(false);
      this._username$.next(username);
      this._user$.next(undefined);
      return;
    }

    const url = environment.base_url + '/auth' + '/' + username;

    this.http.get(url)
      .subscribe((u) => {
        const user = u as User;

        this._loggedIn$.next(true);
        this._username$.next(user.name);
        this._user$.next(user);
      }, (err) => {
        this._loggedIn$.next(false);
        this._username$.next(username);
        this._user$.next(undefined);
      }
    );
  }

  logout() {
    this._loggedIn$.next(false);
    this._username$.next('');
    this._user$.next(undefined);
  }
}
