import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SnackGameEngineService} from '@feature/snake-game/services/snack-game-engine/snack-game-engine.service';
import {SnakeGameSettings} from '@feature/snake-game/components/snake-game-settings/snake-game-settings';

@Component({
  selector: 'app-snack-game-screen-overlay',
  imports: [
    SnakeGameSettings
  ],
  templateUrl: './snack-game-screen-overlay.html',
  styleUrl: './snack-game-screen-overlay.scss',
})
export class SnackGameScreenOverlay {

  protected game = inject(SnackGameEngineService);

  @ViewChild('btnAction')
  protected set focusBtn(btn: ElementRef) {
    if (btn) {
      btn.nativeElement.focus();
    }
  }
}
