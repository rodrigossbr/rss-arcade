import {Component, inject} from '@angular/core';
import {
  SnackGameScreenOverlay
} from '@feature/snake-game/components/snack-game-screen-overlay/snack-game-screen-overlay';
import {SnackGameEngineService} from '@feature/snake-game/services/snack-game-engine/snack-game-engine.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-skake-game-board',
  imports: [
    SnackGameScreenOverlay,
    NgClass
  ],
  templateUrl: './skake-game-board.html',
  styleUrl: './skake-game-board.scss',
})
export class SkakeGameBoard {

  protected game = inject(SnackGameEngineService);

  protected rows = Array.from({length: this.game.BOARD_SIZE}, (_, i) => i);
  protected cols = Array.from({length: this.game.BOARD_SIZE}, (_, i) => i);
  protected gridStyle = `repeat(${this.game.BOARD_SIZE}, 1fr)`;

  protected isSnake(x: number, y: number): boolean {
    return this.game.snake().some(s => s.x === x && s.y === y);
  }

  protected isSnakeHead(x: number, y: number): boolean {
    const head = this.game.snake()[0];
    return head.x === x && head.y === y;
  }

  protected isFood(x: number, y: number): boolean {
    const f = this.game.food();
    return f.x === x && f.y === y;
  }
}
