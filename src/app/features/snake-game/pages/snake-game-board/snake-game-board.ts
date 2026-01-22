import {Component, HostListener, inject} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {SnackGameEngineService} from '../../services/snack-game-engine/snack-game-engine.service';
import {ArcadeBackButton} from '@app/shared';

@Component({
  selector: 'app-game-board',
  imports: [
    NgClass,
    NgTemplateOutlet,
    ArcadeBackButton
  ],
  templateUrl: './snake-game-board.html',
  styleUrl: './snake-game-board.scss',
})
export class SnakeGameBoard {

  protected game = inject(SnackGameEngineService);

  protected rows = Array.from({length: this.game.BOARD_SIZE}, (_, i) => i);
  protected cols = Array.from({length: this.game.BOARD_SIZE}, (_, i) => i);
  protected gridStyle = `repeat(${this.game.BOARD_SIZE}, 1fr)`;

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

  protected stopGame(): void {
    this.game.stopGame();
  }
}
