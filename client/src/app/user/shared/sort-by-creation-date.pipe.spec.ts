import { SortByCreationDatePipe } from './sort-by-creation-date.pipe';

describe('SortByCreationDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SortByCreationDatePipe();
    expect(pipe).toBeTruthy();
  });
});
