import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: string, gender: string | null, married: boolean | null): string {
    if(!gender || gender.trim() === '') {
      return value;
    }
    if(gender.toLowerCase() === 'male') {
      return 'Mr.' + value;
    } else {
      return married? 'Mrs.' + value : 'Miss.' + value;
    }
  }

}
