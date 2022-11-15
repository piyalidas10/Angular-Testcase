import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
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
});
