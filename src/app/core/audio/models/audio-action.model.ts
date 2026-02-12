export interface AudioAction<T extends string> {
  action: T;
  path: string;
  volume: number;
}
