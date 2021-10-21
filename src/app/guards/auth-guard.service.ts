import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth : AuthService,
    private router : Router,
  ) { }

  canActivate() {
    const loggedin = this.auth.loggedin;
    console.log(loggedin);
    if (!loggedin) this.router.navigate(['signin']);
    return this.auth.loggedin;
  }
}
