import { TestBed } from '@angular/core/testing';

import { TakeitdataService } from './takeitdata.service';

describe('TakeitdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TakeitdataService = TestBed.get(TakeitdataService);
    expect(service).toBeTruthy();
  });
});
