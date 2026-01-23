import {Component, computed, inject} from '@angular/core';
import {RiverRaidEngineService} from '@feature/river-raid/services/river-raid-engine.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-river-raid-hud',
  imports: [CommonModule],
  templateUrl: './river-raid-hud.html',
  styleUrl: './river-raid-hud.scss',
})
export class RiverRaidHud {
  engine = inject(RiverRaidEngineService);

  readonly formattedScore = computed(() => {
    return this.engine.score().toString().padStart(6, '0');
  });

  // Calcula a cor da barra baseado na quantidade
  readonly fuelColor = computed(() => {
    const f = this.engine.fuel();
    if (f > 50) return '#4ade80'; // Verde
    if (f > 25) return '#facc15'; // Amarelo
    return '#ef4444';             // Vermelho
  });

  // Define se deve piscar (Crítico < 20%)
  isFuelCritical() {
    return this.engine.fuel() < 20;
  }
}
