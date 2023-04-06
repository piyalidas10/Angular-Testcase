import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskData'
})
export class MaskDataPipe implements PipeTransform {

  transform(value: string, maskByChar?: string, startPos?: number, endPos?: number): string {
    if (value) {
      if (!maskByChar) {
        maskByChar = '*';
      }
      if (!startPos || startPos < 1) {
        startPos = 1;
      }
      if (!endPos || endPos > value.length) {
        endPos = value.length;
      }
      const firstVisibleVals = value.slice(0, startPos - 1);
      const maskVal = value.slice(startPos - 1, endPos);
      const lastVisibleVals = value.slice(endPos);
      return firstVisibleVals + maskVal.replace(/./g, maskByChar) + lastVisibleVals;
    } else {
      return value;
    }
  }

}
