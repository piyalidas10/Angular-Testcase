import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(arr: any[], field: string, orderBy?: string): any[] {
    if (arr.length > 0) {
      if (orderBy === 'desc') {
        return this.descending(arr, field);
      }
      return this.ascending(arr, field);
    }
    return [];
  }

  private ascending(arr: any[], field: string) {
    arr.sort( (a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    return arr;
  }

  private descending(arr: any[], field: string) {
    arr.sort( (a, b) => {
      if (a[field] > b[field]) return -1;
      if (a[field] < b[field]) return 1;
      return 0;
    });
    return arr;
  }

}
