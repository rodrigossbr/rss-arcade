
export enum ThemeEnum {
  lightTheme = 'light-theme',
  darkTheme = 'dark-theme',
  arcadeTheme = 'arcade-theme'
}

export interface ThemeState {
  current: ThemeEnum;
}
