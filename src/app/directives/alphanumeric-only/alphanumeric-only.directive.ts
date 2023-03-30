import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlphanumericOnly]',
})
export class AlphanumericOnlyDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    return this.validateAlphanumeric(event);
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    return this.validateAlphanumeric(event);
  }

  validateAlphanumeric(event: KeyboardEvent) {
    console.log('event => ', event);
    const code = event.keyCode ? event.keyCode : 0;
    if (code === 8 || code === 0) { // 8 - backspace
      return true;
    } else if (code >= 65 && code <= 90) {
      return true;
    } else if (code >= 96 && code <= 122) {
      return true;
    } else if (code >= 48 && code <= 57) {
      return true;
    } else if (event.ctrlKey) {
      // for ctrl + v
      return true;
    } else {
      return false;
    }
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: KeyboardEvent) {
    /* 
        Avoid direct DOM updation. better to use Renderer2 
        this.el.nativeElement.value.replace(/[^0-9a-zA-Z ]/g, '').replace(/\s/g, '');
      */
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      this.el.nativeElement.value
        .replace(/[^0-9a-zA-Z ]/g, '')
        .replace(/\s/g, '')
    );
    event.preventDefault();
  }
}
