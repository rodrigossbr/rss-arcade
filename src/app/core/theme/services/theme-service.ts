import {DOCUMENT, Inject, Injectable} from '@angular/core';
import {ThemeEnum, ThemeState} from '../models/theme-state.model';
import {StateStoreService} from '@rssbr/state-store';

@Injectable({
  providedIn: 'root',
})
export class ThemeService extends StateStoreService<ThemeState> {

  public constructor(@Inject(DOCUMENT) private document: Document) {
    super('rss-arcade', 'theme-config', { useLocalStorage: true });
    this.applyTheme(this.getState()?.current || ThemeEnum.arcadeTheme);
  }

  public override initialState(): ThemeState {
    return {
      current: ThemeEnum.arcadeTheme
    };
  }

  public setTheme(theme: ThemeEnum): void {
    const previousTheme = this.getState().current;
    this.document.body.classList.remove(previousTheme);
    this.updatePartialState({current: theme});
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeEnum): void {
    this.document.body.classList.add(theme);
  }
}
