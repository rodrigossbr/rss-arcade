import {computed, inject, Injectable, OnDestroy, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {SnackGameSettingsStore} from '../../stores/snack-game-settings-store/snack-game-settings-store';
import {SnakeGameAudioService} from '../audio/snake-game-audio.service';

export interface Point {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

@Injectable({
  providedIn: 'root'
})
export class SnackGameEngineService implements OnDestroy {
  private readonly gameSettingsStore = inject(SnackGameSettingsStore);
  private audio = inject(SnakeGameAudioService);

  public readonly BOARD_SIZE = 30;
  public readonly INITIAL_SPEED = 150;
  public readonly INITIAL_SNAKE: Point[] = [{x: 10, y: 10}];

  public readonly snake = signal<Point[]>(this.INITIAL_SNAKE);
  public readonly food = signal<Point>({x: 5, y: 5});
  public readonly direction = signal<Direction>('RIGHT');
  public readonly status = signal<GameStatus>('IDLE');
  public readonly score = computed(() => (this.snake().length - 1) * 10);
  public readonly isGameOver = computed(() => this.status() === 'GAME_OVER');
  public readonly isPaused = computed(() => this.status() === 'PAUSED');
  public readonly highScore = signal<number>(0);
  public readonly hasWallCollision = signal<boolean>(false);

  // @ts-ignore
  private gameLoopId: NodeJS.Timeout | null = null;
  private nextDirection: Direction = 'RIGHT';
  private moveControl: boolean = true;
  private subscription = new Subscription();

  public constructor() {
    this.resetGame();

    this.subscription.add(
      this.gameSettingsStore.state$.subscribe(state => {
        this.highScore.set(state?.highScore ?? 0);
        this.hasWallCollision.set(!!state?.wallCollision);
      })
    );
  }

  public ngOnDestroy(): void {
    this.stopGameLoop();
  }

  public startGame(): void {
    if (this.status() === 'PLAYING') return;

    if (this.status() === 'GAME_OVER') {
      this.resetGame();
    }

    this.status.set('PLAYING');
    this.gameLoopId = setInterval(() => this.gameTick(), this.INITIAL_SPEED);
  }

  public pauseGame(): void {
    if (this.status() === 'PLAYING') {
      this.status.set('PAUSED');
      this.stopGameLoop();
    } else if (this.status() === 'PAUSED') {
      this.startGame();
    }
  }

  public stopGame(): void {
    this.stopGameLoop();
    this.status.set('IDLE');
    this.audio.stop();
  }

  public toggleWallCollision(): void {
    if (this.status() === 'IDLE' || this.status() === 'GAME_OVER') {
      const current = this.gameSettingsStore.getState().wallCollision;
      this.gameSettingsStore.updatePartialState({wallCollision: !current});
    }
  }

  public changeDirection(newDir: Direction): void {
    if (this.status() !== 'PLAYING') return;

    const currentDir = this.direction();

    const isOpposite =
      (currentDir === 'UP' && newDir === 'DOWN') ||
      (currentDir === 'DOWN' && newDir === 'UP') ||
      (currentDir === 'LEFT' && newDir === 'RIGHT') ||
      (currentDir === 'RIGHT' && newDir === 'LEFT');

    if (!isOpposite) {
      this.nextDirection = newDir;
    }
  }

  public toggleMute() {
    return this.audio.toggleMute();
  }

  public isMuted(): boolean {
    return this.audio.isMuted();
  }

  private snakeMove() {
    if (this.moveControl) {
      this.audio.play('move');
    }
    this.moveControl = !this.moveControl;
  }

  private snakeDie() {
    this.audio.play('die');
  }

  private snakeEat() {
    this.audio.play('eat');
  }

  private gameTick(): void {
    this.direction.set(this.nextDirection);
    this.snakeMove();
    const head = this.snake()[0];
    const newHead = this.calculateNewHead(head, this.direction());

    if (this.checkCollision(newHead)) {
      this.snakeDie();
      this.handleGameOver();
      return;
    }

    const newSnake = [newHead, ...this.snake()];

    if (this.isEatingFood(newHead)) {
      this.snakeEat();
      this.spawnFood(newSnake);
    } else {
      newSnake.pop();
    }

    this.snake.set(newSnake);
  }

  private handleGameOver(): void {
    this.stopGameLoop();
    this.status.set('GAME_OVER');

    const currentScore = this.score();
    const currentRecord = this.gameSettingsStore.getState().highScore;

    if (currentScore > currentRecord) {
      this.gameSettingsStore.updatePartialState({highScore: currentScore});
    }
  }

  private stopGameLoop(): void {
    if (this.gameLoopId) {
      clearInterval(this.gameLoopId);
      this.gameLoopId = null;
    }
  }

  private resetGame(): void {
    this.stopGameLoop();
    this.snake.set([...this.INITIAL_SNAKE]);
    this.direction.set('RIGHT');
    this.nextDirection = 'RIGHT';
    this.status.set('IDLE');
    this.spawnFood(this.INITIAL_SNAKE);
  }

  private calculateNewHead(head: Point, dir: Direction): Point {
    const move = {...head};

    switch (dir) {
      case 'UP':
        move.y--;
        break;
      case 'DOWN':
        move.y++;
        break;
      case 'LEFT':
        move.x--;
        break;
      case 'RIGHT':
        move.x++;
        break;
    }

    if (!this.hasWallCollision()) {
      if (move.x < 0) move.x = this.BOARD_SIZE - 1;
      else if (move.x >= this.BOARD_SIZE) move.x = 0;

      if (move.y < 0) move.y = this.BOARD_SIZE - 1;
      else if (move.y >= this.BOARD_SIZE) move.y = 0;
    }

    return move;
  }

  private checkCollision(pt: Point): boolean {
    if (pt.x < 0 || pt.x >= this.BOARD_SIZE || pt.y < 0 || pt.y >= this.BOARD_SIZE) {
      return true;
    }

    const snakeBody = this.snake();
    for (let i = 0; i < snakeBody.length - 1; i++) {
      if (pt.x === snakeBody[i].x && pt.y === snakeBody[i].y) {
        return true;
      }
    }

    return false;
  }

  private isEatingFood(head: Point): boolean {
    return head.x === this.food().x && head.y === this.food().y;
  }

  private spawnFood(currentSnake: Point[]): void {
    let newFood: Point;
    let isValidPosition = false;

    while (!isValidPosition) {
      newFood = {
        x: Math.floor(Math.random() * this.BOARD_SIZE),
        y: Math.floor(Math.random() * this.BOARD_SIZE)
      };

      const isOnSnake = currentSnake.some(
        segment => segment.x === newFood.x && segment.y === newFood.y
      );

      if (!isOnSnake) {
        isValidPosition = true;
        this.food.set(newFood);
      }
    }
  }
}
