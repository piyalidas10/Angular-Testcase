import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { SafeType } from 'src/app/models/safe-type';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
			case SafeType.HTML: return this.sanitizer.bypassSecurityTrustHtml(value);
			case SafeType.STYLE: return this.sanitizer.bypassSecurityTrustStyle(value);
			case SafeType.SCRIPT: return this.sanitizer.bypassSecurityTrustScript(value);
			case SafeType.URL: return this.sanitizer.bypassSecurityTrustUrl(value);
			case SafeType.RESOURCEURL: return this.sanitizer.bypassSecurityTrustResourceUrl(value);
			default: throw new Error(`Invalid safe type specified`);
		}
  }
}
