import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { User } from '../../domain';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public username : string = '';

  constructor(
    private auth : AuthService,
  ) {
    this.auth.username$.subscribe((username) => {
       this.username = username;
    });
  }

  onChange(username : string) {
    this.auth.login(username, '');
  }
}
