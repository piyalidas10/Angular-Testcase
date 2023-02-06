import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user';
import { LoaderService } from 'src/app/services/loader/loader.service';

import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';

describe('HttpErrorHandlerInterceptor', () => {
  let client: HttpClient;
  let httpController: HttpTestingController;
  let interceptor: HttpErrorHandlerInterceptor;
  let loaderService: LoaderService;
  const testUrl = 'https://jsonplaceholder.typicode.com/users';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpErrorHandlerInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorHandlerInterceptor,
          multi: true
        },
        {
          provide: LoaderService,
          useValue: loaderService
        }
      ]
    });
    client = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    loaderService = TestBed.inject(LoaderService);
    interceptor = TestBed.inject(HttpErrorHandlerInterceptor);
  });

  describe('getUsers()', () => {

    it('can test for 404 error', () => {
      const emsg = 'deliberate 404 error';
      const errorResponse = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found'
      });
      client.get('https://jsonplaceholder.typicode.com/user').subscribe(
        () => fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          expect(error).toEqual(errorResponse);
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual(emsg);
        }
      );
    });

  });

  afterEach(() => {
    httpController.verify();
  });
});
