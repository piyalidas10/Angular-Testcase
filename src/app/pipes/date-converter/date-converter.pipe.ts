import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(value: number | null): string {
    if(!value) {
      return '';
    }
    const convertToDate = new Date(value);
    return convertToDate.toLocaleDateString();
  }

}
