import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ArcadeThemeSelector} from '@app/shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArcadeThemeSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rss-arcade');
}
