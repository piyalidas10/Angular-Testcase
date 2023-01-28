import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockFakeUsers } from 'src/app/mockdata/fakeusers';
import { FakeusersApiService } from './fakeusers-api.service';

describe('FakeusersApiService', () => {
  let service: FakeusersApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FakeusersApiService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(FakeusersApiService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFakeUsers', () => {
    it('getFakeUsers() should be called', () => {
      httpClientSpy.get.and.returnValue(of(mockFakeUsers)); // call http get method
      service.getFakeUsers().subscribe((data) => { // now have to subscribe getFakeUsers method to get data
        expect(data).toEqual(mockFakeUsers);
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
