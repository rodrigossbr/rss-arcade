import { Routes } from '@angular/router';
import {HomeComponent} from '@feature/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Rodrigo Arcade'
  },
  {
    path: 'river-raid',
    loadChildren: () =>
      import('@feature/river-raid/river-raid.routes').then((m) => m.RIVER_RIDE_ROUTES)
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
