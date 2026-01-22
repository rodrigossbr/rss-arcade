import { TestBed } from '@angular/core/testing';

import { SnakeGameAudioService } from './snake-game-audio.service';

describe('AudioService', () => {
  let service: SnakeGameAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakeGameAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
