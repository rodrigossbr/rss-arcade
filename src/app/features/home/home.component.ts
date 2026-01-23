import {Component} from '@angular/core';
import {CardGame} from '@feature/home/components/card-game/card-game';

@Component({
  selector: 'app-home',
  imports: [
    CardGame
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
