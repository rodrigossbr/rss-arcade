import {Routes} from '@angular/router';
import {SnakeGameBoard} from './pages/snake-game-board/snake-game-board';


export const SNAKE_GAME_ROUTES: Routes = [
  {
    path: '',
    component: SnakeGameBoard
  }
];
