import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  constructor(
    private signUpService : SignUpService,
    private router : Router,
  ) { }

  signUp() {
    this.signUpService.signup({ username : "matheus", password : "default" }).subscribe((status) => {
      console.log(status);
      this.router.navigate(['signin']);
    });
  }
}
