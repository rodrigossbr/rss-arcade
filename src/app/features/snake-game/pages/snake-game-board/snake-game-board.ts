import {Component, HostListener, inject} from '@angular/core';
import {SnackGameEngineService} from '../../services/snack-game-engine/snack-game-engine.service';
import {ArcadeBackButton} from '@app/shared';
import {SnakeGameHud} from '@feature/snake-game/components/snake-game-hud/snake-game-hud';
import {SnakeGameControlsHint} from '@feature/snake-game/components/snake-game-controls-hint/snake-game-controls-hint';
import {SkakeGameBoard} from '@feature/snake-game/components/skake-game-board/skake-game-board';

@Component({
  selector: 'app-snake-game-board',
  imports: [
    ArcadeBackButton,
    SnakeGameHud,
    SnakeGameControlsHint,
    SkakeGameBoard
  ],
  templateUrl: './snake-game-board.html',
  styleUrl: './snake-game-board.scss',
})
export class SnakeGameBoard {

  protected game = inject(SnackGameEngineService);

  @HostListener('window:keydown', ['$event'])
  protected handleKeyboardEvent(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowUp':
        this.game.changeDirection('UP');
        break;
      case 'ArrowDown':
        this.game.changeDirection('DOWN');
        break;
      case 'ArrowLeft':
        this.game.changeDirection('LEFT');
        break;
      case 'ArrowRight':
        this.game.changeDirection('RIGHT');
        break;
      case ' ':
        this.game.pauseGame();
        break;
    }
  }

  protected stopGame(): void {
    this.game.stopGame();
  }
}
