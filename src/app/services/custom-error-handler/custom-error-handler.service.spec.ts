import { TestBed } from '@angular/core/testing';

import { CustomErrorHandlerService } from './custom-error-handler.service';

describe('CustomErrorHandlerService', () => {
  let service: CustomErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
