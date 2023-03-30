import { LoggerService } from '../logger/logger.service';

import { CalculatorOriginalService } from './calculator-original.service';

/*
  *********** Not preferred for UNIT TESTING *************
  Directly creating & calling dependencies like logger service without spying dependencies
*/

describe('CalculatorOriginalService', () => {

  it('should add two numbers', () => {
    console.log('Add Calculator 2');
    const loggerSrv = new LoggerService();
    const calculator = new CalculatorOriginalService(loggerSrv);
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
  });

  it('should substract two numbers', () => {
    console.log('Subtract Calculator 2');
    const loggerSrv = new LoggerService();
    const calculator = new CalculatorOriginalService(loggerSrv);
    const result = calculator.subtract(5, 2);
    expect(result).toBe(3);
  });
});

/*
  Why should avoid direct

  So let's say that we have here Metford the as calculated method that is calling internally the Logger service. 
  Now, let's suppose that this is inexpensive service that consumes a lot of resources. 
  So we would like to make sure that we only call the log function of the logger once whenever we execute the add operation.
  So our test should fail, If we would call here to log a second time, for example.

  Usually what we want to do is we want to provide the mock or fake implementations of all the direct dependencies
   of the services that we are testing so that we keep our test as a plain unit test.
*/