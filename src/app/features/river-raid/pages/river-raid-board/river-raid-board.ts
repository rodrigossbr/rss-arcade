import {Component, inject} from '@angular/core';
import {RiverRaidEngineService} from '@feature/river-raid/services/river-raid-engine.service';
import {RiverRaidHud} from '@feature/river-raid/components/river-raid-hud/river-raid-hud';
import {ArcadeBackButton} from '@app/shared';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-river-raid-board',
  imports: [
    RiverRaidHud,
    ArcadeBackButton,
    NgClass
  ],
  templateUrl: './river-raid-board.html',
  styleUrl: './river-raid-board.scss',
})
export class RiverRaidBoard {

  engine = inject(RiverRaidEngineService);

  ngOnInit() {
    // Opcional: Se quiser que o jogo comece assim que abrir a tela:
    // this.startGame();
  }

  ngOnDestroy() {
    // Garante que o loop pare se sair da página
    this.engine.stopGame();
  }

  startGame() {
    this.engine.startGame();
  }
}
