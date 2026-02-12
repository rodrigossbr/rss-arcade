import {Component, inject} from '@angular/core';
import {RiverRaidEngineService} from '@feature/river-raid/services/river-raid-engine.service';

@Component({
  selector: 'app-river-raid-slices',
  imports: [],
  templateUrl: './river-raid-slices.html',
  styleUrl: './river-raid-slices.scss',
})
export class RiverRaidSlices {

  protected engine = inject(RiverRaidEngineService);
}
