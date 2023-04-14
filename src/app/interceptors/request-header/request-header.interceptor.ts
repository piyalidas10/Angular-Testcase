import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  // HttpConfigInterceptor will inject header configuration to each http request.

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.headers.has('Content-type')) {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    }
    request = request.clone({headers: request.headers.set('Accept', 'application/json')});
    
    // add auth header with jwt if account is logged in and request is to the api url
    // const account = this.accountService.accountValue;
    // const isLoggedIn = account?.token;
    // const isApiUrl = request.url.startsWith(environment.apiUrl);
    // if (isLoggedIn && isApiUrl) {
    //     request = request.clone({
    //         setHeaders: { Authorization: `Bearer ${account.token}` }
    //     });
    // }
    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      })
    );
  }
}
