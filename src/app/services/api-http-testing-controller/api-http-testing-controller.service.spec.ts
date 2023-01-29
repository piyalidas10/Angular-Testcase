import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockUsers } from 'src/app/mockdata/users';

import { ApiHttpTestingControllerService } from './api-http-testing-controller.service';

describe('ApiHttpTestingControllerService', () => {
  let service: ApiHttpTestingControllerService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiHttpTestingControllerService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe('getUsers()', () => {
    it('getUsers() should be called', (done: DoneFn) => {
      service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
        expect(data).toEqual(mockUsers);
        done();
      });
      httpController.expectOne({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
      }).flush(mockUsers);      
    });
    it('getUsers() return an error when the server returns a 404 error', () => {
      service.getUsers().subscribe(
        () => {},
        (error: any) => {
          expect(error).toEqual(error);
        }
      );
      httpController.expectOne({
        method: 'GET',
      }).flush("", { status: 404, statusText: "Not Found" });
    });
    it('getUsers() return an error when the server returns error other than 404', () => {
      const errorStr = `Failed to fetch users`;
      service.getUsers().subscribe(
        () => {},
        (error: string) => {
          expect(error).toEqual(errorStr);
        }
      );
      httpController.expectOne({
        method: 'GET',
      }).flush(errorStr, { status: 400, statusText: "Bad Request" });
    });
  });

  afterEach(() => {
    httpController.verify();
  });
});
