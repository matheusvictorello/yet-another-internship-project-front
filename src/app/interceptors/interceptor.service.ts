import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private auth : AuthService,
  ) { }

  intercept( request : HttpRequest<any>, next : HttpHandler ) : Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Auth: `Bearer ${this.auth.jwt}`
      }
    });
    
    return next.handle(request);
  }
}