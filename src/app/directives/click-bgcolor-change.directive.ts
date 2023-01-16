import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickBgcolorChange]'
})
export class ClickBgcolorChangeDirective {
  @Input() colorCode = '';
  defaultColor = '#0000FF';
  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }

  @HostListener('click', ['$event']) clickEvent(event: any) {
    this.onClick();
  }

  onClick() {
    this.el.nativeElement.style.color = this.colorCode || this.defaultColor;
  }

}

// https://angular.io/guide/testing-attribute-directives
