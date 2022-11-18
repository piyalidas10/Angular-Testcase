import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {mockUsers} from '../mockdata/users';

/*
 --------------- Testing Http Services with mock Http Client using  Jasmine Spy--------------------------
*/
describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ApiService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('getUsers() should be called', () => {
      httpClientSpy.get.and.returnValue(of(mockUsers)); // call http get method
      service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
        expect(data).toEqual(mockUsers);
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });

});
