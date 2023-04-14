import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TrackingService } from '../tracking/tracking.service';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let trackingSrv: TrackingService;
  const env = {production: true};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackingService,
        {provide: environment, useValue: env}
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoggerService);
    trackingSrv = TestBed.inject(TrackingService);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have any messages', () => {
    expect(service.msg).toEqual([]);
  });

  it('should add message when log is called', () => {
    service.log('test');
    expect(service.msg).toEqual(['test']);
    expect(service.msg.length).toEqual(1);
  });

  it('message should be cleared when clear is called', () => {
    service.clear();
    expect(service.msg).toEqual([]);
    expect(service.msg.length).toEqual(0);
  });

  it('message should be cleared when error is called', () => {
    service.error('HTTP Service error', 'HttpErrorResponse', '400 error msg');
    spyOn(trackingSrv, 'track');
  });
});
