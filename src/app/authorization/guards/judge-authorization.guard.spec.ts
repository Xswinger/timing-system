import { TestBed } from '@angular/core/testing';

import { JudgeAuthorizationGuard } from './judge-authorization.guard';

describe('AuthorizationGuard', () => {
  let guard: JudgeAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JudgeAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
