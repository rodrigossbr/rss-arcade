export type EntityType = 'PLAYER' | 'BULLET' | 'ENEMY_HELI' | 'ENEMY_SHIP' | 'FUEL';

export interface GameEntity {
  id: number;
  type: EntityType;
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number; // Para inimigos que se movem lateralmente
  active: boolean; // Se false, removemos do jogo (ex: explodiu)
}

// ... Mantenha as interfaces RiverSlice e Player que já existiam ...
export interface RiverSlice {
  id: number;
  y: number;
  height: number;
  leftBank: number;
  rightBank: number;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  maxSpeed: number;
}
