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
import { ErrorShowService } from 'src/app/services/error-show/error-show.service';
import { HttpErrors } from 'src/app/models/http-errors';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService, private errorShowService: ErrorShowService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.loaderShow();
    return next.handle(request).pipe(
      retry(1),
      finalize(() => {
        this.loaderService.loaderHide();
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.displayServerErrorMessage(error);
        this.errorShowService.errorMsg.next(errorMsg);
        return throwError(errorMsg);
      })
    ) as Observable<HttpEvent<unknown>>;
  }

   //  Avoid to pass the real errors to client
   private displayServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return `${HttpErrors[400]}: put your message here`;
      }
      case 401: {
        return `${HttpErrors[401]}: put your message here`;
      }
      case 403: {
        return `${HttpErrors[403]}: put your message here`;
      }
      case 404: {
        return `${HttpErrors[404]}: put your message here`;
      }
      case 500: {
        return `${HttpErrors[500]}: put your message here`;
      }
      default: {
        return `Please Try Again Later`;
      }
    }
  }
}
