import { UpperCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService extends ErrorHandler{

  constructor(private loggerService: LoggerService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    super.handleError(error);
    if (error instanceof HttpErrorResponse) {
      // this.loading.stop();
      if (!navigator.onLine) {
        this.loggerService.log('No Internet access');
      }
      this.loggerService.error('HTTP Service error', error.name, error.message);      
    } else {
      this.loggerService.error('UI Error', error.name, error.message); 
    }
  }
}
