import {Component, inject} from '@angular/core';
import {ThemeService} from '@core/theme/services/theme-service';
import {ThemeEnum} from '@core/theme/models/theme-state.model';
import {AsyncPipe} from '@angular/common';
import {TooltipDirective} from '@app/shared';

@Component({
  selector: 'app-arcade-theme-selector',
  imports: [
    AsyncPipe,
    TooltipDirective
  ],
  templateUrl: './arcade-theme-selector.html',
  styleUrl: './arcade-theme-selector.scss',
})
export class ArcadeThemeSelector {

  private themeService = inject(ThemeService);

  protected themes = [
    {id: ThemeEnum.arcadeTheme, label: 'Arcade Mode', color: '#ff0055'},
    {id: ThemeEnum.darkTheme, label: 'Dark Mode', color: '#3f51b5'},
    {id: ThemeEnum.lightTheme, label: 'Light Mode', color: '#ffffff'},
  ];

  protected currentTheme$ = this.themeService.state$;

  protected select(themeId: ThemeEnum) {
    this.themeService.setTheme(themeId);
  }
}
