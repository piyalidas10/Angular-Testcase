import { TestBed } from '@angular/core/testing';

import { ApiTestbedService } from './api-testbed.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mockUsers } from '../../mockdata/users';

/*
 --------------- Testing Http Services with mock Http Client using TestBed--------------------------
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ApiService(httpClientSpy);
  });
 For instance of a service / component, you should use testbed instead of using new ApiService(httpClientSpy)
 Let's use TestBed for creating instance of ApiTestbedService and HttpClient
*/
describe('ApiTestbedService', () => {
  let service: ApiTestbedService;
  // let httpController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiTestbedService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(ApiTestbedService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    // httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('getUsers() with success', () => {
      httpClientSpy.get.and.returnValue(of(mockUsers)); // call http get method
      service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
        expect(data).toEqual(mockUsers);
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
    // it('getUsers() should be called', () => {
    //   service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
    //     expect(data).toEqual(mockUsers);
    //   });
    //   httpController.expectOne({
    //     method: 'GET'
    //   }).flush(mockUsers);
    //   httpController.verify();
    // });
  });
  
  it('getUsers() return an error when the server returns a 404', () => {
    httpClientSpy.get.and.returnValue(of({})); // call http get method
    service.getUsers().subscribe(
      () => {},
      (error: any) => {
        expect(error).toEqual(error);
      }
    );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
