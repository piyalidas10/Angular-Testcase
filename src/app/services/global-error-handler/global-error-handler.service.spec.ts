import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../logger/logger.service';

import { GlobalErrorHandler } from './global-error-handler.service';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;
  let loggerSrv: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(GlobalErrorHandler);
    loggerSrv = TestBed.inject(LoggerService);
  });

  it('handleError will be called with error', () => {
    service.handleError(new Error('UI Error'));
  });

  it('handleError will be called with HttpErrorResponse', () => {
    const error = new HttpErrorResponse({
      error: 'test error',
      status: 400,
      statusText: 'Ok'
    });
    service.handleError(error);
  });

  it('handleError will be called with HttpErrorResponse', () => {
    spyOnProperty(Navigator.prototype, 'onLine').and.returnValue(false);
    const error = new HttpErrorResponse({
      error: 'test error',
      status: 400,
      statusText: 'Ok'
    });
    service.handleError(error);
  });
});
