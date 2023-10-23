import { TestBed } from '@angular/core/testing';

import { TimekeeperAuthorizationGuard } from './timekeeper-authorization.guard';

describe('TimekeeperAuthorizationGuard', () => {
  let guard: TimekeeperAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TimekeeperAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
