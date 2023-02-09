import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RequestHeaderInterceptor } from './request-header.interceptor';

// We want to test that an appropriate header configuration is added to each http request before sending it to server.
describe('RequestHeaderInterceptor', () => {
  let client: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestHeaderInterceptor,
          multi: true,
        }
      ]
    });
    client = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should add content type & accept poperty in header', () => {
    client.get(`https://jsonplaceholder.typicode.com/users`).subscribe(
      (res) => { expect(res).toBeTruthy(); }
    );
    const httpReq = httpController.expectOne(`https://jsonplaceholder.typicode.com/users`);
    expect(httpReq.request.headers.has('Content-type')).toEqual(true);
    expect(httpReq.request.headers.has('Accept')).toEqual(true);
    expect(httpReq.request.headers.get('Content-type')).toBe('application/json');
    expect(httpReq.request.headers.get('Accept')).toBe('application/json');
  });
});
