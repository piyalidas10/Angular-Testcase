import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let calculatorSrv: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    calculatorSrv = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(calculatorSrv).toBeTruthy();
  });

  /* spyOn use */
  it('should add two numbers', () => {
    const logger = new LoggerService(); // Here we create a new instance of logger service
    // spyOn(logger, 'log'); will not call the log method
    spyOn(logger, 'log').and.callThrough(); // will call original log method
    const calculator = new CalculatorService(logger);
    const result = calculator.add(2, 2);
    expect(result).toBe(4); // First exepct

    // Validate how many times the logger is being called
    expect(logger.log).toHaveBeenCalledTimes(1); // Check if the function is being called only once
  });

  /* createSpyObj use */
  // it('should add two numbers', () => {
  //   // Implementing Jasmine Create Spy Object
  //   const logger = jasmine.createSpyObj('LoggerService', ['log']);

  //   const calculator = new CalculatorService(logger);
  //   const result = calculator.add(2, 2);
  //   expect(result).toBe(4); // First exepct

  //   // Validate how many times the logger is being called
  //   // Check if the function is being called only once
  //   expect(logger.log).toHaveBeenCalledTimes(1);
  // });

  it('should substract two numbers', () => {
    const logger = new LoggerService(); // Here we create a new instance of logger service
    // spyOn(logger, 'log'); will not call the log method
    spyOn(logger, 'log').and.callThrough(); // will call original log method
    const calculator = new CalculatorService(logger);
    const result = calculator.subtract(5, 2);
    expect(result).toBe(3); // First exepct

    // Validate how many times the logger is being called
    expect(logger.log).toHaveBeenCalledTimes(1); // Check if the function is being called only once
  });

  /* createSpyObj use */
  // it('should substract two numbers', () => {
  //   // Implementing Jasmine Create Spy Object
  //   const logger = jasmine.createSpyObj('LoggerService', ['log']);

  //   const calculator = new CalculatorService(logger);
  //   const result = calculator.subtract(5, 2);
  //   expect(result).toBe(3); // First exepct

  //   // Validate how many times the logger is being called
  //   // Check if the function is being called only once
  //   expect(logger.log).toHaveBeenCalledTimes(1);
  // });
});
