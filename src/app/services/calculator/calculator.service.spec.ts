import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from '../logger/logger.service';
import { TrackingService } from '../tracking/tracking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CalculatorService', () => {
  let calculatorSrv: CalculatorService;
  let trackingSrv: TrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
    });
    calculatorSrv = TestBed.inject(CalculatorService);
    trackingSrv = TestBed.inject(TrackingService);
  });

  it('should be created', () => {
    expect(calculatorSrv).toBeTruthy();
  });

  /* spyOn use */
  it('should add two numbers', () => {
    console.log('Add Calculator');
    const logger = new LoggerService(trackingSrv); // Here we create a new instance of logger service
    /*
      *****  spyOn(logger, 'log'); *****

      We are going to pass to it the object that we want to spy as the first argument of spy on. So we want to spy on the logger object.
      The second argument that we need to pass in here is the list of methods that we want to spy on. 
      So in this case, there is only one method, which is the log method.

      So what will happen here with the use of spam is the Jasmine is going to take the original spy object and 
      then Jasmine is going to replace some of its functions with a new function.

      So in this case, Jasmine is going to take the instance of our log and Jasmine is going to replace 
      the log meathod with a new method, these new implementation of LOG.

      Besides calling the original functionality that we see here, the new implementation of LOG will also 
      keep track of how many times the function has been called.

      ************ Why need jasmine.createSpyObj **************
      const logger = new LoggerService();
      spyOn(logger, 'log');
      Alternatively, to providing an actual implementation of the dependency and then spying on it.
      What we can do is to provide a complete fake version of the logger service without creating here an actual logger instance.
      This is actually the preferred approach for implementing unit tests. 
      So whenever we are implementing a unit test, for example, for the calculator service, the only actual instance of a service 
      that should be present in the test is the calculator service itself or any other dependency of the calculator service 
      should be mocked and replaced with a fake test implementation. 
      We are only logging here to the console, but in many cases our dependencies themselves have many other dependencies, 
      such as, for example, external services that connect to a back into a database, etc. and we would not want to provide actual implementations of
      All those dependent services, what we want to do in this state is to focus on the functionality of the service being unit tested and nothing more.
      This is why a test like this is called a unit test.
      It's because we are testing here only a small unit of our overall system, in this case, the calculator service.
      In this test, we want to test the functionality of the calculator service, nothing more.
      So that is why we are always providing an actual implementation of the calculator service. But then we are mocking or providing fake test implementations of all its dependencies.
      These will ensure that the calculator service unit test will fail only due to problems in the calculator.
      So we would like, instead of creating here an actual longer service dependency, we would prefer to create a fake dependency.
      And we can do that using, for example, the Jasmine space functionality.
    */
    spyOn(logger, 'log'); // will not call the log method
    // spyOn(logger, 'log').and.callThrough(); // will call original log method
    const calculator = new CalculatorService(logger);
    const result = calculator.add(2, 2);
    expect(result).toBe(4); // First exepct
    

    // Validate how many times the logger is being called
    expect(logger.log).toHaveBeenCalledTimes(1); // Check if the function is being called only once
  });

  it('should substract two numbers', () => {
    console.log('Subtract Calculator');
    const logger = new LoggerService(trackingSrv); // Here we create a new instance of logger service
    spyOn(logger, 'log'); // will not call the log method
    // spyOn(logger, 'log').and.callThrough(); // will call original log method
    const calculator = new CalculatorService(logger);
    const result = calculator.subtract(5, 2);
    expect(result).toBe(3); // First exepct

    // Validate how many times the logger is being called
    expect(logger.log).toHaveBeenCalledTimes(1); // Check if the function is being called only once
  });
});
