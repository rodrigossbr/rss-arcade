import { TestBed } from '@angular/core/testing';

import { SnackGameSettingsStore } from './snack-game-settings-store';

describe('SnackGameSettingsStore', () => {
  let service: SnackGameSettingsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackGameSettingsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
