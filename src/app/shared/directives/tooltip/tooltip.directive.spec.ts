import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: `<label>
  Enter your security code
  <span tooltip tooltip="3 digits, back of your card">
    (?)
  </span>
  <input type="text">
</label>`
})
class TestComponent {
}

describe('TooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  let directive: TooltipDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TooltipDirective
      ],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('span'));
    directive = fixture.debugElement.query(By.directive(TooltipDirective)).injector.get(TooltipDirective) as TooltipDirective;
  });

  it('should call the show method when the a is clicked with colorCode on mouseover', () => {
    spyOn(directive, 'show').and.callThrough();
    inputEl.triggerEventHandler('mouseenter', null);
    expect(directive.show).toHaveBeenCalled();
    fixture.detectChanges();
  });

  it('should call the show method when the a is clicked with colorCode on mouseover', () => {
    spyOn(directive, 'hide').and.callThrough();
    inputEl.triggerEventHandler('mouseleave', null);
    expect(directive.hide).toHaveBeenCalled();
    fixture.detectChanges();
  });
});
