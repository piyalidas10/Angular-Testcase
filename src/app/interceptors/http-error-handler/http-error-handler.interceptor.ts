import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading$.next(true);
    return next.handle(request).pipe(
      retry(1),
      finalize(() => {
        this.loaderService.isLoading$.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
          return throwError(errorMsg);
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          return throwError(this.displayServerErrorMessage(error));
        }
      })
    ) as Observable<HttpEvent<any>>;
  }

   //  Avoid to pass the real errors to client
   private displayServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return `Bad Request: put your message here`;
      }
      case 401: {
        return `Unauthorized: put your message here`;
      }
      case 403: {
        return `Forbidden: put your message here`;
      }
      case 404: {
        return `Not Found: put your message here`;
      }
      case 422: {
        return `Unprocessable Entity: put your message here`;
      }
      case 500: {
        return `Internal Server Error: put your message here`;
      }
      default: {
        return `Please Try Again Later`;
      }
    }
  }
}
