import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') tooltipTitle: string;
  @Input() placement: string;
  tooltip: HTMLElement;
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hide();
  }

  show() {
    this.tooltip = this.renderer.createElement('span');
    this.renderer.appendChild(this.tooltip, this.renderer.createText(this.tooltipTitle));
    this.tooltip.classList.add('tooltip');
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    this.renderer.addClass(this.el.nativeElement,'tooltip-container');
  }

  hide() {
    this.renderer.removeClass(this.el.nativeElement,'tooltip-container');
    this.renderer.removeChild(this.el.nativeElement, this.tooltip);
  }

}
