import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCreationDate'
})
export class SortByCreationDatePipe implements PipeTransform {

  transform(collection: any[], order: string = 'asc'): any {
    if (!collection) {
      return null;
    }
    const newCollection = collection.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return order === 'asc' ? aTime - bTime : bTime - aTime;
    });
    return newCollection;
  }

}
