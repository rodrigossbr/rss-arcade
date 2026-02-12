import {Component, inject, OnDestroy} from '@angular/core';
import {RiverRaidEngineService} from '@feature/river-raid/services/river-raid-engine.service';
import {RiverRaidHud} from '@feature/river-raid/components/river-raid-hud/river-raid-hud';
import {ArcadeBackButton} from '@app/shared';
import {NgClass} from '@angular/common';
import {RiverRaidControlsHint} from '@feature/river-raid/components/river-raid-controls-hint/river-raid-controls-hint';
import {RiverRaidEnemies} from '@feature/river-raid/components/river-raid-enemies/river-raid-enemies';
import {RiverRaidPlayerJet} from '@feature/river-raid/components/river-raid-player-jet/river-raid-player-jet';
import {RiverRaidSlices} from '@feature/river-raid/components/river-raid-slices/river-raid-slices';
import {RiverRaidOverlay} from '@feature/river-raid/components/river-raid-overlay/river-raid-overlay';

@Component({
  selector: 'app-river-raid-board',
  imports: [
    RiverRaidHud,
    ArcadeBackButton,
    NgClass,
    RiverRaidControlsHint,
    RiverRaidEnemies,
    RiverRaidPlayerJet,
    RiverRaidSlices,
    RiverRaidOverlay
  ],
  templateUrl: './river-raid-board.html',
  styleUrl: './river-raid-board.scss',
})
export class RiverRaidBoard implements OnDestroy {

  protected engine = inject(RiverRaidEngineService);

  public ngOnInit() {
    // Opcional: Se quiser que o jogo comece assim que abrir a tela:
    // this.startGame();
  }

  public ngOnDestroy() {
    // Garante que o loop pare se sair da página
    this.engine.stopGame();
  }

  startGame() {
    this.engine.startGame();
  }
}
