import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickBgcolorChangeDirective } from './click-bgcolor-change.directive';

@Component({
  template: `<a appClickBgcolorChange [colorCode]="'#ff0000'">CLick</a>`
})
class TestComponent {
}

describe('ClickBgcolorChangeDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  let directive: ClickBgcolorChangeDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ClickBgcolorChangeDirective
      ],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('a'));
    directive = fixture.debugElement.query(By.directive(ClickBgcolorChangeDirective)).injector.get(ClickBgcolorChangeDirective) as ClickBgcolorChangeDirective;
  });

  it('should call the onClick method when the a is clicked with colorCode', () => {
    spyOn(directive, 'onClick').and.callThrough(); // will call original onClick method
    inputEl.triggerEventHandler('click', null);
    expect(directive.onClick).toHaveBeenCalled();
    const bgColor = inputEl.nativeElement.style.backgroundColor;
    expect(bgColor).toBe(directive.colorCode);
    fixture.detectChanges();
  });
});
