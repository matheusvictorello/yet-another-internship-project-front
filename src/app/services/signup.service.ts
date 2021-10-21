import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { SignUpRequest } from './SignUpRequest';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private BASE_URL = environment.BASE_URL + "/signup";

  constructor(
    private http : HttpClient,
  ) { }

  signup(request : SignUpRequest) {
    return this.http.post<boolean>(this.BASE_URL, request);
  }
}
