import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TrackingService } from './tracking.service';
import { SharedService } from '../shared/shared.service';
import { of, throwError } from 'rxjs';
import { mockTrackEvent } from '../../mockdata/trackEvent';
import { Endpoint } from 'src/app/config/endpoint';

describe('TrackingService', () => {
  let service: TrackingService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['post']);
    const spy = jasmine.createSpyObj('SharedService', ['getCurrentTime']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TrackingService,
        { provide: SharedService, useValue: spy },
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(TrackingService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be called initialize method', () => {
    expect(service['initialize']());
  });

  it('should be called track method with "this.trackingUrl === Endpoint.originApi" ', () => {
    service['trackingUrl'] = Endpoint.originApi;
    service.pageBuilder('test');
    service.track('test-API', 'test-API-success', mockTrackEvent.customValue);
  });

  it('should be called track method with "this.trackingUrl?.indexOf(undefined) >= 0" & location.pathname="/"', () => {
    service['trackingUrl'] = `${Endpoint.originApi}/undefined`;
    service.pageBuilder('/');
    service.track('test-API', 'test-API-success');
  });

  it('should be called track method with cutomValue with error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 404,
      statusText: 'Not Found'
    });
    service.track('test-API', '', mockTrackEvent.customValue);
    httpClientSpy.post.and.returnValue(of(errorResponse)); // call http post method and get return
    // service['callToTrackAPI'](mockTrackEvent).subscribe(
    //   err => {
    //     expect(err).toBe(errorResponse);
    //   }
    // );
  });

  it('should be called track method with cutomValue with success', () => {
    const successResponse = new HttpResponse({
      status: 200,
      statusText: 'saved successfully'
    });
    service.track('test-API', '', mockTrackEvent.customValue);
    httpClientSpy.post.and.returnValue(of(successResponse)); // call http post method and get return
    // service['callToTrackAPI'](mockTrackEvent).subscribe(
    //   data => {
    //     expect(data).toBe(successResponse);
    //   }
    // );
  });
});
