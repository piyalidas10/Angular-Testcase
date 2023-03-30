import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiPostService } from './api-post.service';

describe('ApiPostService', () => {
  let service: ApiPostService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiPostService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe('createAirline()', () => {
    it('getUsers() return data if successful', (done: DoneFn) => {
      const reqPayload = {
        "id": 122667875,
        "name": "Sri Lankan Airways",
        "country": "Sri Lanka",
        "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png",
        "slogan": "From Sri Lanka",
        "head_quaters": "Katunayake, Sri Lanka",
        "website": "www.srilankaairways.com",
        "established": "1990"
    };
      const successRes = {
        "_id": "63d777f44d46860d6112ecc9",
        "id": 122667875,
        "name": "Sri Lankan Airways",
        "country": "Sri Lanka",
        "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png",
        "slogan": "From Sri Lanka",
        "head_quaters": "Katunayake, Sri Lanka",
        "website": "www.srilankaairways.com",
        "established": "1990",
        "__v": 0
      };
      service.createAirline(reqPayload).subscribe((data) => {
        expect(data).toEqual(successRes);
        done();
      });
      const req = httpController.expectOne({
        method: 'POST',
      });
      expect(req.request.body).toEqual(reqPayload);
      req.flush(successRes);
    });

    it('getUsers() with Duplicate ID then the server returns a 400 error', () => {
      const reqPayload = {
        "id": 12,
        "name": "Sri Lankan Airways",
        "country": "Sri Lanka",
        "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png",
        "slogan": "From Sri Lanka",
        "head_quaters": "Katunayake, Sri Lanka",
        "website": "www.srilankaairways.com",
        "established": "1990"
    };
      service.createAirline(reqPayload).subscribe(
        () => { },
        (error: any) => {
          expect(error).toEqual(error);
        }
      );
      const req = httpController.expectOne({
        method: 'POST',
      });
      expect(req.request.body).toEqual(reqPayload);
      req.flush({message:"there is an airline registered under same id you've entered"}, { status: 400, statusText: "Bad Request" });
    });

    it('getUsers() return an error when the server returns a 404 error', () => {
      const reqPayload = {
        "id": 12,
        "name": "Sri Lankan Airways",
        "country": "Sri Lanka",
        "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png",
        "slogan": "From Sri Lanka",
        "head_quaters": "Katunayake, Sri Lanka",
        "website": "www.srilankaairways.com",
        "established": "1990"
    };
      service.createAirline(reqPayload).subscribe(
        () => { },
        (error: any) => {
          expect(error).toEqual(error);
        }
      );
      const req = httpController.expectOne({
        method: 'POST',
      });
      expect(req.request.body).toEqual(reqPayload);
      req.flush("", { status: 404, statusText: "Not Found" });
    });
  });

  afterEach(() => {
    /*
      So we are going to make sure using verify that no unintended EDP requests are Triggered by safe course, 
      the only request that we expect is this put coal and we d we have written the specification 
      that tests the error handling behavior of the safe course method.
    */
    httpController.verify();
  });
});
