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
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (!!this.authService.getToken()) {
		// 	request = request.clone({
		// 		setHeaders: {
		// 			Authorization: `Bearer ${this.authService.getToken()}`
		// 		}
		// 	});
		// }
    return next.handle(request)
    // .pipe(
		// 	tap(null,
		// 	error => {
		// 		if(error.status === 401) {
		// 			this.authService.logout();
		// 			this.router.navigate(['/login']);
		// 		}
		// 	})
		// );
  }
}
