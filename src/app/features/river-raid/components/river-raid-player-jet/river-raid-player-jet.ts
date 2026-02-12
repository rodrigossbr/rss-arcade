import {Component, inject} from '@angular/core';
import {RiverRaidEngineService} from '@feature/river-raid/services/river-raid-engine.service';

@Component({
  selector: 'app-river-raid-player-jet',
  imports: [],
  templateUrl: './river-raid-player-jet.html',
  styleUrl: './river-raid-player-jet.scss',
})
export class RiverRaidPlayerJet {

  protected engine = inject(RiverRaidEngineService);
}
