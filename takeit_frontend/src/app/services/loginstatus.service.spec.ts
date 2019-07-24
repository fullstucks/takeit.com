import { TestBed } from '@angular/core/testing';

import { LoginstatusService } from './loginstatus.service';

describe('LoginstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginstatusService = TestBed.get(LoginstatusService);
    expect(service).toBeTruthy();
  });
});
