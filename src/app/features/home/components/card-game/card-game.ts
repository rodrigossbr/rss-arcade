import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-card-game',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './card-game.html',
  styleUrl: './card-game.scss',
})
export class CardGame {

  @Input() public routerLink!: string;
  @Input() public icon!: string;
  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public disabled: boolean = false;
}
