import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageRangeFilter'
})
export class AgeRangeFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
