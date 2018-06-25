import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {

  transform(lists: any[], type: any): any {
    if (!lists || lists.length === 0) {
      return [];
    }
    if (type === 'All Lists') {
      return lists;
    } else if (type === 'Private') {
      return lists.filter(list => list.private);
    } else if (type === 'Public') {
      return lists.filter(list => !list.private);
    }
  }

}
