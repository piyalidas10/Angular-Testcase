import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MouseBgcolorChangeDirective } from './mouse-bgcolor-change.directive';

@Component({
  template: `<a appMouseBgcolorChange [colorCode]="'#ff0000'">Mouse hover / out</a>`
})
class TestComponent {
}

describe('MouseBgcolorChangeDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  let directive: MouseBgcolorChangeDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        MouseBgcolorChangeDirective
      ],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('a'));
    directive = fixture.debugElement.query(By.directive(MouseBgcolorChangeDirective)).injector.get(MouseBgcolorChangeDirective) as MouseBgcolorChangeDirective;
  });

  it('should call the onChange method when the a is clicked with colorCode on mouseover', () => {
    spyOn(directive, 'onChange').and.callThrough();
    inputEl.triggerEventHandler('mouseover', null);
    expect(directive.onChange).toHaveBeenCalled();
    const bgColor = inputEl.nativeElement.style.backgroundColor;
    expect(bgColor).toBe(directive.colorCode);
    fixture.detectChanges();
  });

  it('should call the onChange method when the a is clicked with colorCode on mouseout', () => {
    spyOn(directive, 'onChange').and.callThrough();
    inputEl.triggerEventHandler('mouseout', null);
    expect(directive.onChange).toHaveBeenCalled();
    const bgColor = inputEl.nativeElement.style.backgroundColor;
    expect(bgColor).toBe(directive.colorCode);
    fixture.detectChanges();
  });
});
