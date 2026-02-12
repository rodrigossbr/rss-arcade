import {effect, inject, Injectable, OnDestroy, signal} from '@angular/core';
import {AudioDefinitions} from '@core/audio';
import {SnackGameSettingsStore} from '@feature/snake-game/stores/snack-game-settings-store/snack-game-settings-store';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AudioService<T extends string> implements OnDestroy {

  private store = inject(SnackGameSettingsStore);

  protected readonly isMutedSignal = signal<boolean>(this.store.getState()?.isMuted ?? false);

  private sounds: Record<string, HTMLAudioElement> = {};
  private subscription = new Subscription();

  protected constructor() {
    if (typeof window !== 'undefined') {
      this.loadSounds();

      this.subscription.add(
        this.store.state$.subscribe(state => {
          if (state) {
            this.isMutedSignal.set(state.isMuted);
          }
        })
      );
    }

    effect(() => {
      if (this.isMutedSignal()) {
        this.stopAllSounds();
      }
    });
  }

  public abstract audioDefinitions(): AudioDefinitions<T>;

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public play(keyAction: string) {
    if (this.isMutedSignal() || typeof window === 'undefined') return;

    const sound = this.sounds[keyAction];
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
    this.store.updatePartialState({isMuted: !this.isMutedSignal()});
  }

  public get isMuted() {
    return this.isMutedSignal();
  }

  private loadSounds() {
    const { actions } = this.audioDefinitions();

    actions.forEach(action => {
      this.sounds[action.action] = new Audio(action.path);
      this.sounds[action.action].volume = action.volume;
    });
  }

  private stopAllSounds() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}
