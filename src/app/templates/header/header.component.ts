import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private auth : AuthService,
    private router : Router,
  ) { }

  get username$() {
    return this.auth.user$.pipe(map((user) => user.username));
  }

  get loggedin$() {
    return this.auth.loggedin$;
  }

  get url() {
    return this.router.url;
  }

  signOut() {
    this.auth.desauthenticate();
    this.router.navigate(['']);
  }
}
