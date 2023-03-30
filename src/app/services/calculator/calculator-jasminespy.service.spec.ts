import { CalculatorJasminespyService } from './calculator-jasminespy.service';
import { LoggerService } from '../logger/logger.service';

describe('CalculatorJasminespyService', () => {
  let calculator: CalculatorJasminespyService;
  let loggerSpy: LoggerService;

    beforeEach(() => {
        /*
            we should spy dependency Logger Service 
            Let's imagine that the logger service consumes expensive resources that should not be overused.
            So we want to make sure that logger service only gets called once per operation in order to test for that.
            In our tests, we are going to be introducing the concept of a Jasmine spy before doing that.

            const logger = new LoggerService();
            spyOn(logger, 'log');
            We don't need here the uses of spyOn because these are Logger Object is already being spy by jasmine.createSpyObj.

            If instead of using here a logger spy for the Lowgar service, we would be injecting a real implementation of the logger service.
            Then in this case, this would no longer be a unit test. 
            This would now become an integration test because in that case we would be testing not only the calculator service in isolation, but we would be testing the calculator service, the logger service and the way that the two actual implementations work together.
            So it's very important that we mock all the dependencies of the service being tested in order for this to still be considered a unit test and not an integration test.
            Also, it's very important that the multiple tests that we write for a service to be isolated from each So that is achieved here via the before each block where we are really analyzing all the variables that each test is going to need.
            So each test is going to get its own testing module with its own private instance of the calculator service and the longer spy in order to ensure that the tests do not interfere with each other and that the order of the tests does not affect the test outcome.
        */
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']); // Complete fake implementation of Logger service
        calculator = new CalculatorJasminespyService(loggerSpy); // Call the calculator
    });
    
    it('should add two numbers', () => {
        console.log('Add Calculator 1');
        const result = calculator.add(2, 2);
        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
    it('should substract two numbers', () => {
        console.log('Subtract Calculator 1');
        const result = calculator.subtract(5, 2);
        expect(result).toBe(3);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
});
