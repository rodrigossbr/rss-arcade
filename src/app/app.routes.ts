import { Routes } from '@angular/router';
import {HomeComponent} from '@feature/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Rodrigo Arcade'
  },
  {
    path: 'snake',
    loadChildren: () =>
      import('@feature/snake-game/snake-game.routes').then((m) => m.SNAKE_GAME_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
