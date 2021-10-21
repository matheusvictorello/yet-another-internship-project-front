import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent {

  constructor(
    private auth : AuthService,
    private router : Router,
  ) { }

  signIn() {
    this.auth.authenticate({
      username: "matheus",
      password: "default"
    }).subscribe(() => {
      this.router.navigate(['home']);
    });
  }
}
