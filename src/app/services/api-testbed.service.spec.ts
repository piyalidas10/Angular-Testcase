import { TestBed } from '@angular/core/testing';

import { ApiTestbedService } from './api-testbed.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

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
  let httpController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const mockRes = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
  ];

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

  describe('getUsers', () => {
    httpClientSpy.get.and.returnValue(of(mockRes)); // call http get method
      service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
        expect(data).toEqual(mockRes);
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    // it('getUsers() should be called', () => {
    //   service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
    //     expect(data).toEqual(mockRes);
    //   });
    //   httpController.expectOne({
    //     method: 'GET'
    //   }).flush(mockRes);
    //   httpController.verify();
    // });
  });
});
