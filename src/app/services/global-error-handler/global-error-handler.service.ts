import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorType, GlobalError } from 'src/app/models/global-error';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler extends ErrorHandler{

  constructor(
    private loggerService: LoggerService,
    private injector: Injector
  ) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    console.log('handleError =====> ', error);
    super.handleError(error);
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        this.loggerService.log('No Internet access');
      }
      //Backend returns unsuccessful response codes such as 404, 500 etc.
      this.loggerService.error('HTTP Service error', error.name, error.message); 
      this.createErrorRoteParams(ErrorType.SERVER, error);      
          
    } else {
      this.loggerService.error('UI Error', error.name, error.message); 
      this.createErrorRoteParams(ErrorType.UI, error);
    }
  }

  createErrorRoteParams(errorType: ErrorType, error: Error | HttpErrorResponse) {
    let router = this.injector.get(Router);
    console.log('URL: ' + router.url);
    let errorData;
    errorData = new GlobalError();
    errorData.errorMsg = error.message;
    errorData.errorType = errorType;
    errorData.errorObj = error;
    if (errorType === ErrorType.SERVER) {
      errorData.errorStatus = (error as HttpErrorResponse).status;
    }
    router.navigate(['/error'],  {
      queryParams: { errorDataVal: JSON.stringify(errorData)}
    });
  }

}
