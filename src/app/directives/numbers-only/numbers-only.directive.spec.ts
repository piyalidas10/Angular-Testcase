import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NumbersOnlyDirective } from './numbers-only.directive';

@Component({
  selector: 'app-test',
  template: '<input appNumbersOnly>',
})
class TestComponent {}

describe('NumbersOnlyDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveElm: DebugElement;
    let directive: NumbersOnlyDirective;
  
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [
          TestComponent,
          NumbersOnlyDirective
        ],
        imports: [CommonModule, FormsModule, ReactiveFormsModule]
      }).createComponent(TestComponent);
      component = fixture.componentInstance;
      directiveElm = fixture.debugElement.query(By.directive(NumbersOnlyDirective));
      directive = directiveElm.injector.get(NumbersOnlyDirective);
      fixture.detectChanges();
    });
  
    it('validateNumber call with keyCode = 8 (backspace)', () => {
      const eventInit: KeyboardEventInit = {
        keyCode: 8,
        ctrlKey: false
      };
      const event = new KeyboardEvent('keypress', eventInit);
      spyOn(directive, 'validateNumber').and.callThrough();
      directiveElm.triggerEventHandler('keypress', event);
      expect(directive.validateNumber).toHaveBeenCalled();
    });
  
    it('validateNumber call with keyCode = 48 (0)', () => {
      const eventInit: KeyboardEventInit = {
        keyCode: 48,
        ctrlKey: false
      };
      const event = new KeyboardEvent('keypress', eventInit);
      spyOn(directive, 'validateNumber').and.callThrough();
      directiveElm.triggerEventHandler('keypress', event);
      expect(directive.validateNumber).toHaveBeenCalled();
    });
  
    it('validateNumber call with keyCode = 96 (numpad 0)', () => {
      const eventInit: KeyboardEventInit = {
        keyCode: 96,
        ctrlKey: false
      };
      eventInit.modifierNumLock = true;
      const event = new KeyboardEvent('keydown', eventInit);
      spyOn(directive, 'validateNumber').and.callThrough();
      directiveElm.triggerEventHandler('keydown', event);
      expect(directive.validateNumber).toHaveBeenCalled();
    });
  
    it('validateNumber call with ctrlKey = true', () => {
      const eventInit: KeyboardEventInit = {
        keyCode: 17,
        ctrlKey: true
      };
      const event = new KeyboardEvent('keydown', eventInit);
      spyOn(directive, 'validateNumber').and.callThrough();
      directiveElm.triggerEventHandler('keydown', event);
      expect(directive.validateNumber).toHaveBeenCalled();
    });
  
    it('validateNumber call with keyCode = 1', () => {
      const eventInit: KeyboardEventInit = {
        keyCode: 1,
        ctrlKey: false
      };
      const event = new KeyboardEvent('keydown', eventInit);
      spyOn(directive, 'validateNumber').and.callThrough();
      directiveElm.triggerEventHandler('keydown', event);
      expect(directive.validateNumber).toHaveBeenCalled();
    });

    it('validateNumber call with no keyCode', () => {
        const eventInit: KeyboardEventInit = {
          ctrlKey: false
        };
        const event = new KeyboardEvent('keydown', eventInit);
        spyOn(directive, 'validateNumber').and.callThrough();
        directiveElm.triggerEventHandler('keydown', event);
        expect(directive.validateNumber).toHaveBeenCalled();
      });
  
    it('validateFields call with paste event', () => {
      const eventInit: KeyboardEventInit = {
        key: 'v',
        ctrlKey: true
      };
      const event = new KeyboardEvent('paste', eventInit);
      const preventDefaultSpy = spyOn(event, 'preventDefault').and.stub();
      spyOn(directive, 'validateFields').and.callThrough();
      directiveElm.triggerEventHandler('paste', event);
      expect(directive.validateFields).toHaveBeenCalled();
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
});
