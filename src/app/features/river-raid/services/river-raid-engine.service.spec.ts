import { TestBed } from '@angular/core/testing';

import { RiverRaidEngineService } from './river-raid-engine.service';

describe('RiverRaiEngineService', () => {
  let service: RiverRaidEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiverRaidEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
