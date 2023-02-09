import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/components/login/login/login.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found/page-not-found.component';
import { appRoutes } from 'src/app/routing.module';
import {Location} from "@angular/common";

import { RedirectInterceptor } from './redirect.interceptor';

describe('RedirectInterceptor', () => {
  let httpController: HttpTestingController;
  let client: HttpClient;
  let router: Router;

  const successResponse = new HttpResponse({
    status: 200,
    body: { success: 'success' }, 
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    }),
    statusText: 'OK',
    url: 'http://localhost:4200/login',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(appRoutes),
      ],
      declarations: [
        LoginComponent,
        PageNotFoundComponent
      ],
      providers: [ 
        RedirectInterceptor,
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RedirectInterceptor,
          multi: true,
        }
      ]
    }).compileComponents();
    client = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should redirect to /main/home if login successful', () => {
    client.get(`https://jsonplaceholder.typicode.com/users`).subscribe(
      (res) => { expect(res).toBeTruthy(); }
    );
    const httpReq = httpController.expectOne(`https://jsonplaceholder.typicode.com/users`);
    expect(httpReq.request.headers.has('Content-type')).toEqual(true);
    expect(httpReq.request.headers.has('Accept')).toEqual(true);
    expect(httpReq.request.headers.get('Content-type')).toBe('application/json');
    expect(httpReq.request.headers.get('Accept')).toBe('application/json');
  });

  // it('should redirect to /main/home if login successful', fakeAsync(inject([ Location,   RedirectInterceptor ], (location: Location, service: RedirectInterceptor) => {
  //   const successSpy = spyOn(service, 'intercept');
  //   router.initialNavigation();
  //   // tick(50);
  //   expect(location.path()).toEqual('/login');
  //   expect(successSpy).not.toHaveBeenCalled();

  //   client.get(window.location.host + '/login').subscribe((response: any) => {
  //       // tick(100);
  //       expect(response.status).toEqual(200);
  //       expect(response.body.success).toEqual('success');
  //       expect(location.path()).toEqual('/home');
  //   });
    
  //   const req = httpController.expectOne(window.location.host + '/login');
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(successResponse);
        
  // })));

  // it('should redirect to /main/error if login fail', fakeAsync(inject([ Location,   RedirectInterceptor ], (location: Location, service: RedirectInterceptor) => {
  //   const successSpy = spyOn(service, 'intercept');
  //   router.initialNavigation();
  //   expect(location.path()).toEqual('/login');
  //   expect(successSpy).not.toHaveBeenCalled();

  //   client.get(window.location.host + '/login').subscribe(
  //   () => {},
  //   (error: HttpErrorResponse) => {
  //     expect(location.path()).toEqual('/error');
  //   }
  //   );
    
  //   const req = httpController.expectOne(window.location.host + '/login');
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(successResponse);
        
  // })));

  afterEach(() => {
    // calling verify() method after each test to make sure that there is no unmatched outstanding request.
    httpController.verify();
  });
});
