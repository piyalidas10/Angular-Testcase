import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMouseBgcolorChange]'
})
export class MouseBgcolorChangeDirective {
  @Input() colorCode = '';
  defaultColor = '#0000FF';
  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }

  @HostListener('mouseover', ['$event']) mouseoverEvent(event: any) {
    this.onChange();
  }

  @HostListener('mouseout', ['$event']) mouseoutEvent(event: any) {
    this.onChange();
  }

  onChange() {
    this.el.nativeElement.style.color = this.colorCode || this.defaultColor;
  }
}
