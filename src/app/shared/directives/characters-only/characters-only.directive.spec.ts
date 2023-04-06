import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CharactersOnlyDirective } from './characters-only.directive';

@Component({
  selector: 'app-test',
  template: '<input appCharactersOnly>'
})

class TestComponent {}

describe('CharactersOnlyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElm: DebugElement;
  let directive: CharactersOnlyDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        CharactersOnlyDirective
      ],
      imports: [CommonModule, FormsModule, ReactiveFormsModule]
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElm = fixture.debugElement.query(By.directive(CharactersOnlyDirective));
    directive = directiveElm.injector.get(CharactersOnlyDirective);
    fixture.detectChanges();
  });

  it('validateCharacter call with keyCode = 8 (backspace)', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 8,
      ctrlKey: false
    };
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateCharacter').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateCharacter).toHaveBeenCalled();
  });

  it('validateCharacter call with keyCode = 65 (A)', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 65,
      ctrlKey: false
    };
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateCharacter').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateCharacter).toHaveBeenCalled();
  });

  it('validateCharacter call with keyCode = 97 (a)', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 97,
      ctrlKey: false
    };
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateCharacter').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateCharacter).toHaveBeenCalled();
  });

  it('validateCharacter call with ctrlKey = true', () => {
    const eventInit: KeyboardEventInit = {
      ctrlKey: true
    };
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateCharacter').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateCharacter).toHaveBeenCalled();
  });

  it('validateCharacter call with keyCode = 0', () => {
    const eventInit: KeyboardEventInit = {
      keyCode: 0,
      ctrlKey: false
    };
    const event = new KeyboardEvent('keydown', eventInit);
    spyOn(directive, 'validateCharacter').and.callThrough();
    directiveElm.triggerEventHandler('keydown', event);
    expect(directive.validateCharacter).toHaveBeenCalled();
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
