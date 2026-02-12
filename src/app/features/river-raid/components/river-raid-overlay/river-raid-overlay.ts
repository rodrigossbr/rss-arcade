import {Component, inject} from '@angular/core';
import {RiverRaidEngineService} from '@feature/river-raid/services/river-raid-engine.service';
import {RiverRaidControlsHint} from '@feature/river-raid/components/river-raid-controls-hint/river-raid-controls-hint';

@Component({
  selector: 'app-river-raid-overlay',
  imports: [
    RiverRaidControlsHint
  ],
  templateUrl: './river-raid-overlay.html',
  styleUrl: './river-raid-overlay.scss',
})
export class RiverRaidOverlay {

  protected engine = inject(RiverRaidEngineService);
}
