import {Injectable} from '@angular/core';
import {SnackGameState} from '../models/snack-game-state';
import {StateStoreService} from '@rssbr/state-store';

@Injectable({
  providedIn: 'root',
})
export class SnackGameSettingsStore extends StateStoreService<SnackGameState> {

  constructor() {
    super('SNAKE_GAME', 'HIGH_SCORE', {
      useLocalStorage: true,
      initialEmit: true
    });
  }

  public initialState(): SnackGameState {
    return {
      highScore: 0,
      isMuted: false,
      wallCollision: false
    };
  }
}
