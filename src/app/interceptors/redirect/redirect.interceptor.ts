import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RedirectInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === window.location.host + '/login') {
      return next.handle(request).pipe(
        tap(
          (response: any) => {
            this.router.navigate(['/home']);
          }, (error: any) => {
            this.router.navigate(['/error']);
          })
      );
    } else {
      return next.handle(request);
    }
  }
}
