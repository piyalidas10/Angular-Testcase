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
    if(!request.headers.has('content-type')) {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    }
    request = request.clone({headers: request.headers.set('Accept', 'application/json')});
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      })
    );
  }
}
