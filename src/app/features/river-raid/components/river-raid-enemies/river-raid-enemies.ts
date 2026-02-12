import {Component, inject} from '@angular/core';
import {RiverRaidEngineService} from '@feature/river-raid/services/river-raid-engine.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-river-raid-enemies',
  imports: [
    NgClass
  ],
  templateUrl: './river-raid-enemies.html',
  styleUrl: './river-raid-enemies.scss',
})
export class RiverRaidEnemies {

  engine = inject(RiverRaidEngineService);
}
