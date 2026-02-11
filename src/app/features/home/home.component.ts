import {Component} from '@angular/core';
import {CardGame} from '@feature/home/components/card-game/card-game';

interface CardGameDef {
  title: string;
  description: string;
  icon: string;
  routerLink?: string;
}

@Component({
  selector: 'app-home',
  imports: [
    CardGame
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  protected cardsGames: CardGameDef[] = [
    {
      title: 'Snake Game',
      description: 'O clássico. Coma, cresça e sobreviva!',
      icon: '🐍',
      routerLink: '/snake',
    },
    {
      title: 'River Raid Game',
      description: 'O clássico de aviões do Atari!',
      icon: '✈️',
      routerLink: '/river-raid',
    },
    {
      title: 'Em Breve',
      description: 'Novos jogos estão sendo desenvolvidos.',
      icon: '🔒'
    }
  ]
}
