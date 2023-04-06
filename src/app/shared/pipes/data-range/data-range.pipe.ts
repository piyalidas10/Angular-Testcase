import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataRange'
})
export class DataRangePipe implements PipeTransform {

  transform(dataarr: any[], range: number, offset: number = 0): any[] {
    if (!dataarr || range > dataarr.length || range > dataarr.length - offset) {
      return [];
    }
    const array = [];
    for (let n = offset; n < offset + range; ++n) {
      array.push(dataarr[n]);
    }
    return array;
  }

}
