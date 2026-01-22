import { TestBed } from '@angular/core/testing';

import { SnackGameEngineService } from './snack-game-engine.service';

describe('GameEngineService', () => {
  let service: SnackGameEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackGameEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
