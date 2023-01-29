import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiPostService } from './api-post.service';

describe('ApiPostService', () => {
  let service: ApiPostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiPostService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(ApiPostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  // describe('createAirline()', () => {
  //   it('createAirline() with success', () => {
  //     httpClientSpy.get.and.returnValue(of(mockUsers)); // call http get method
  //     service.createAirline().subscribe((data) => { // now have to subscribe getUsers method to get data
  //       expect(data).toEqual(mockUsers);
  //     });
  //     expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  //   });

  //   it('getUsers() return an error when the server returns a 400', () => {
  //     httpClientSpy.get.and.returnValue(of({})); // call http get method
  //     service.createAirline().subscribe(
  //       () => {},
  //       (error: any) => {
  //         expect(error).toEqual(error);
  //       }
  //     );
  //     expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  //   });
  // });
});
