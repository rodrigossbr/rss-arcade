import {Injectable, OnDestroy} from '@angular/core';
import {AudioDefinitions, AudioService} from '@core/audio';

type actionsType = 'eat' | 'die' | 'move';

@Injectable({
  providedIn: 'root',
})
export class SnakeGameAudioService extends AudioService<actionsType> {

  public override audioDefinitions(): AudioDefinitions<actionsType> {
    return {
      actions: [
        {
          action: 'eat',
          volume: 0.5,
          path: 'assets/sounds/snake-eat.ogg'
        },
        {
          action: 'die',
          volume: 0.5,
          path: 'assets/sounds/snake-die.ogg'
        },
        {
          action: 'move',
          volume: 0.1,
          path: 'assets/sounds/snake-move.ogg'
        }
      ]
    };
  }
}
