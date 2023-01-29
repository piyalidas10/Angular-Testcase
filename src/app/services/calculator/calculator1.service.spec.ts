import { TestBed } from '@angular/core/testing';

import { Calculator1Service } from './calculator1.service';
import { LoggerService } from '../logger/logger.service';

describe('Calculator1Service', () => {
  let calculator: Calculator1Service;
  let loggerSpy: LoggerService;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']); // Call the spy
        calculator = new Calculator1Service(loggerSpy); // Call the calculator
    });
    
    it('should add two numbers', () => {
        console.log('Add test');
        const result = calculator.add(2, 2);
        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
    it('should substract two numbers', () => {
        console.log('Subtract test');
        const result = calculator.subtract(5, 2);
        expect(result).toBe(3);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
});
