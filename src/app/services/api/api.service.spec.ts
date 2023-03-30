import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { mockUsers } from '../../mockdata/users';

/*
 --------------- Testing Http Services with mock Http Client using TestBed--------------------------
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ApiService(httpClientSpy);
  });
 For instance of a service / component, you should use testbed instead of using new ApiService(httpClientSpy)
 Let's use TestBed for creating instance of ApiService and HttpClient
*/
describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(ApiService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('getUsers() with success should return data', () => {
      httpClientSpy.get.and.returnValue(of(mockUsers)); // call http get method
      service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
        expect(data).toEqual(mockUsers);
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('getUsers() return an error when the server returns a 404 error', () => {
      httpClientSpy.get.and.returnValue(of({})); // call http get method
      service.getUsers().subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          expect(error).toEqual(error);
        }
      );
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
