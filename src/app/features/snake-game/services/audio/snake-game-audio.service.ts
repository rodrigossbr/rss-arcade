import {effect, inject, Injectable, OnDestroy, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {SnackGameSettingsStore} from '../../stores/snack-game-settings-store/snack-game-settings-store';

@Injectable({
  providedIn: 'root',
})
export class SnakeGameAudioService implements OnDestroy {
  private store = inject(SnackGameSettingsStore);

  public readonly isMuted = signal<boolean>(this.store.getState()?.isMuted ?? false);

  private sounds: Record<string, HTMLAudioElement> = {};
  private subscription = new Subscription();

  public constructor() {
    if (typeof window !== 'undefined') {
      this.loadSounds();

      this.subscription.add(
        this.store.state$.subscribe(state => {
          if (state) {
            this.isMuted.set(state.isMuted);
          }
        })
      );
    }

    effect(() => {
      if (this.isMuted()) {
        this.stopAllSounds();
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadSounds() {
    this.sounds['eat'] = new Audio('assets/sounds/snake-eat.ogg');
    this.sounds['die'] = new Audio('assets/sounds/snake-die.ogg');
    this.sounds['move'] = new Audio('assets/sounds/snake-move.ogg');

    this.sounds['eat'].volume = 0.5;
    this.sounds['die'].volume = 0.5;
    this.sounds['move'].volume = 0.1;
  }

  public play(key: 'eat' | 'die' | 'move') {
    if (this.isMuted() || typeof window === 'undefined') return;

    const sound = this.sounds[key];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
      });
    }
  }

  public stop() {
    this.stopAllSounds();
  }

  public toggleMute() {
    this.store.updatePartialState({isMuted: !this.isMuted()});
  }

  private stopAllSounds() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}
