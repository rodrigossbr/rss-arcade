import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-arcade-back-button',
  imports: [
    RouterLink
  ],
  templateUrl: './arcade-back-button.html',
  styleUrl: './arcade-back-button.scss',
})
export class ArcadeBackButton {

  @Output()
  public readonly backClick = new EventEmitter();

  protected onBackClick() {
    this.backClick.emit();
  }
}
