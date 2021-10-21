import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private BASE_URL   = environment.BASE_URL + "/api";

  constructor(
    private http : HttpClient
  ) { }

  callAPI() {
    this.http.get(`${this.BASE_URL}/users`).subscribe((us) => {
      console.log(us);
    });
  }
}
