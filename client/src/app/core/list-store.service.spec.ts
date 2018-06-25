import { TestBed, inject } from '@angular/core/testing';

import { ListStoreService } from './list-store.service';

describe('ListStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListStoreService]
    });
  });

  it('should be created', inject([ListStoreService], (service: ListStoreService) => {
    expect(service).toBeTruthy();
  }));
});
