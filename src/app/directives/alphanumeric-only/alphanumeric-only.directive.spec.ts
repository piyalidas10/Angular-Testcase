import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AlphanumericOnlyDirective } from './alphanumeric-only.directive';

@Component({
  selector: 'app-test',
  template: '<input appAlphanumericOnly>',
})
class TestComponent {}

describe('AlphanumericOnlyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElm: DebugElement;
  let directive: AlphanumericOnlyDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, AlphanumericOnlyDirective],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElm = fixture.debugElement.query(
      By.directive(AlphanumericOnlyDirective)
    );
    directive = directiveElm.injector.get(AlphanumericOnlyDirective);
    fixture.detectChanges();
  });

  it('validateAlphanumeric call with keyCode = 8 (backspace)', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 8,
      ctrlKey: false,
    };
    const event = new KeyboardEvent('keypress', eventInit);
    spyOn(directive, 'validateAlphanumeric').and.callThrough();
    directiveElm.triggerEventHandler('keypress', event);
    expect(directive.validateAlphanumeric).toHaveBeenCalled();
  });

  it('validateAlphanumeric call with keyCode = 48 (0)', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 48,
      ctrlKey: false,
    };
    const event = new KeyboardEvent('keypress', eventInit);
    spyOn(directive, 'validateAlphanumeric').and.callThrough();
    directiveElm.triggerEventHandler('keypress', event);
    expect(directive.validateAlphanumeric).toHaveBeenCalled();
  });

  it('validateAlphanumeric call with keyCode = 65 (A)', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 65,
      ctrlKey: false,
    };
    const event = new KeyboardEvent('keypress', eventInit);
    spyOn(directive, 'validateAlphanumeric').and.callThrough();
    directiveElm.triggerEventHandler('keypress', event);
    expect(directive.validateAlphanumeric).toHaveBeenCalled();
  });

  it('validateAlphanumeric call with keyCode = 96 (numpad 0)', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 96,
      ctrlKey: false,
    };
    eventInit.modifierNumLock = true;
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateAlphanumeric').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateAlphanumeric).toHaveBeenCalled();
  });

  it('validateAlphanumeric call with ctrlKey = true', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 17,
      ctrlKey: true,
    };
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateAlphanumeric').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateAlphanumeric).toHaveBeenCalled();
  });

  it('validateAlphanumeric call with keyCode = 1', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 1,
      ctrlKey: false,
    };
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateAlphanumeric').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateAlphanumeric).toHaveBeenCalled();
  });

  it('validateAlphanumeric call with no keyCode', () => {
    const eventInit: KeyboardEventInit = {
      ctrlKey: false,
    };
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateAlphanumeric').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateAlphanumeric).toHaveBeenCalled();
  });

  it('validateFields call with paste event', () => {
    const eventInit: KeyboardEventInit = {
      key: 'v',
      ctrlKey: true,
    };
    const event = new KeyboardEvent('paste', eventInit);
    const preventDefaultSpy = spyOn(event, 'preventDefault').and.stub();
    spyOn(directive, 'validateFields').and.callThrough();
    directiveElm.triggerEventHandler('paste', event);
    expect(directive.validateFields).toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
