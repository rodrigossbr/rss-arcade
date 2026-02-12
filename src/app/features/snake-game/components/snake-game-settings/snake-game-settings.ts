import {Component, inject} from '@angular/core';
import {SnackGameEngineService} from '@feature/snake-game/services/snack-game-engine/snack-game-engine.service';

@Component({
  selector: 'app-snake-game-settings',
  imports: [],
  templateUrl: './snake-game-settings.html',
  styleUrl: './snake-game-settings.scss',
})
export class SnakeGameSettings {

  protected game = inject(SnackGameEngineService);
}
