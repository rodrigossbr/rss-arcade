import {Component, inject} from '@angular/core';
import {SnackGameEngineService} from '@feature/snake-game/services/snack-game-engine/snack-game-engine.service';

@Component({
  selector: 'app-snake-game-hud',
  imports: [],
  templateUrl: './snake-game-hud.html',
  styleUrl: './snake-game-hud.scss',
})
export class SnakeGameHud {

  protected game = inject(SnackGameEngineService);
}
