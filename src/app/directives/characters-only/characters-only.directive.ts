import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCharactersOnly]',
})
export class CharactersOnlyDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    return this.validateCharacter(event);
  }

  validateCharacter(event: KeyboardEvent) {
    console.log('event => ', event);
    const code = event.keyCode? event.keyCode: 0;
    if (code === 8) {
      return true;
    } else if (code >= 65 && code <= 90) { // A to Z
      return true;
    } else if (code >= 97 && code <= 122) { // a to z
      return true;
    } else if (event.ctrlKey) { // for ctrl + v
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
        this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^a-zA-Z ]/g, '').replace(/\s/g, '');
      */
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      this.el.nativeElement.value.replace(/[^a-zA-Z ]/g, '').replace(/\s/g, '')
    );
    event.preventDefault();
  }
}
