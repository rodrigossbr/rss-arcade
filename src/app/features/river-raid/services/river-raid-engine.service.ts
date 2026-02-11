import {inject, Injectable, NgZone, OnDestroy, signal} from '@angular/core';
import {EntityType, GameEntity, Player, RiverSlice} from '../models/river-raid.model';

@Injectable({
  providedIn: 'root'
})
export class RiverRaidEngineService implements OnDestroy {
  private ngZone = inject(NgZone);

  // --- CONFIGURAÇÕES DO JOGO ---
  readonly GAME_WIDTH = 600;
  readonly GAME_HEIGHT = 800;
  readonly SCROLL_SPEED = 5;      // Velocidade do rio descendo
  readonly SLICE_HEIGHT = 20;     // Altura de cada fatia do rio
  readonly BULLET_SPEED = 12;     // Velocidade do tiro

  // --- ESTADO DO JOGO (SIGNALS) ---
  readonly status = signal<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  readonly score = signal(0);
  readonly fuel = signal(100);

  // O Jogador
  readonly player = signal<Player>({
    x: 300 - 20,
    y: 650, // Posição fixa vertical (o rio que move)
    width: 40,
    height: 30,
    speedX: 0,
    maxSpeed: 4
  });

  // Listas de Objetos
  readonly riverSlices = signal<RiverSlice[]>([]);
  readonly enemies = signal<GameEntity[]>([]);
  readonly bullets = signal<GameEntity[]>([]);

  // --- VARIÁVEIS INTERNAS ---
  private gameLoopId: number | null = null;
  private keysPressed = new Set<string>();

  // Controle de IDs e Timers
  private nextSliceId = 0;
  private nextEntityId = 0;
  private lastShotTime = 0;

  // Geração Procedural (Algoritmo do Rio)
  private riverCenter = 50; // Centro em % (0 a 100)
  private riverWidth = 60;  // Largura em %
  private riverTrend = 0;   // Tendência da curva

  constructor() {
    this.setupInputs();
  }

  ngOnDestroy(): void {
    this.stopGame();
    this.removeInputs();
  }

  // =================================================================
  // CONTROLE DE FLUXO (START / STOP)
  // =================================================================

  public startGame() {
    if (this.status() === 'PLAYING') return;

    // 1. Resetar Variáveis
    this.score.set(0);
    this.fuel.set(100);
    this.riverSlices.set([]);
    this.enemies.set([]);
    this.bullets.set([]);
    this.keysPressed.clear();
    this.status.set('PLAYING');

    // 2. Resetar Player
    this.player.set({...this.player(), x: this.GAME_WIDTH / 2 - 20, speedX: 0});

    // 3. Resetar Procedural
    this.nextSliceId = 0;
    this.nextEntityId = 0;
    this.riverCenter = 50;
    this.riverWidth = 70;
    this.riverTrend = 0;

    // 4. Gerar Rio Inicial
    this.generateInitialMap();

    // 5. Iniciar Loop (Fora do Angular Zone para performance máxima)
    this.ngZone.runOutsideAngular(() => {
      this.gameLoop();
    });
  }

  public stopGame() {
    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }
    this.status.set('IDLE');
  }

  private setGameOver() {
    this.status.set('GAME_OVER');
    if (this.gameLoopId) cancelAnimationFrame(this.gameLoopId);
  }

  // =================================================================
  // GAME LOOP (60 FPS)
  // =================================================================

  private gameLoop = () => {
    if (this.status() !== 'PLAYING') return;

    // 1. Movimento e Ações
    this.updatePlayer();

    // --- NOVO: Auto-Fire ---
    // Se o ESPAÇO estiver pressionado, tenta atirar
    if (this.keysPressed.has('Space')) {
      this.shoot();
    }

    this.updateMap();
    this.updateEnemies();
    this.updateBullets();

    // 2. Física
    this.checkCollisions();

    // 3. Regras
    this.updateFuel();

    // Próximo Frame
    this.gameLoopId = requestAnimationFrame(this.gameLoop);
  }

  // =================================================================
  // LÓGICA DE MOVIMENTO E FÍSICA
  // =================================================================

  private updatePlayer() {
    const p = this.player();
    let currentSpeed = 0;

    // Input
    if (this.keysPressed.has('ArrowLeft')) currentSpeed = -p.maxSpeed;
    if (this.keysPressed.has('ArrowRight')) currentSpeed = p.maxSpeed;

    let newX = p.x + currentSpeed;

    // Limites Laterais da Tela
    if (newX < 0) newX = 0;
    if (newX > this.GAME_WIDTH - p.width) newX = this.GAME_WIDTH - p.width;

    // Atualiza apenas se moveu
    if (newX !== p.x) {
      this.ngZone.run(() => this.player.update(curr => ({...curr, x: newX})));
    }
  }

  private updateMap() {
    // --- ATUALIZA O RIO ---
    let slices = [...this.riverSlices()];

    // Move tudo para baixo
    slices.forEach(slice => slice.y += this.SCROLL_SPEED);

    // Remove quem saiu da tela (embaixo)
    slices = slices.filter(slice => slice.y < this.GAME_HEIGHT);

    // Cria novos pedaços no topo se necessário
    const highestSliceY = slices.length > 0 ? slices[slices.length - 1].y : this.GAME_HEIGHT;

    if (highestSliceY > -this.SLICE_HEIGHT) {
      // Cria logo acima do último
      const newSlice = this.createProceduralSlice(-this.SLICE_HEIGHT);
      slices.push(newSlice);

      // Pontos por distância percorrida (suave)
      this.ngZone.run(() => this.score.update(s => s + 1));
    }

    this.ngZone.run(() => this.riverSlices.set(slices));
  }

  private updateEnemies() {
    let enemies = [...this.enemies()];

    enemies.forEach(e => {
      // Todos descem com o rio
      e.y += this.SCROLL_SPEED;

      // Lógica Específica: Helicóptero
      if (e.type === 'ENEMY_HELI') {
        e.x += e.speedX;
        // Bate e Volta simples nas laterais (apenas para não sair da tela)
        if (e.x < 50 || e.x > this.GAME_WIDTH - 80) {
          e.speedX *= -1;
        }
      }
    });

    // Remove quem saiu da tela ou morreu
    enemies = enemies.filter(e => e.y < this.GAME_HEIGHT && e.active);

    this.ngZone.run(() => this.enemies.set(enemies));
  }

  private updateBullets() {
    let bullets = [...this.bullets()];

    // Sobem rápido
    bullets.forEach(b => b.y -= this.BULLET_SPEED);

    // Remove se saiu da tela ou colidiu
    bullets = bullets.filter(b => b.y > -20 && b.active);

    this.ngZone.run(() => this.bullets.set(bullets));
  }

  private updateFuel() {
    const current = this.fuel();
    if (current <= 0) {
      this.handleCrash('Sem Combustível');
    } else {
      // Gasta ~0.1% de combustível por frame (ajuste conforme dificuldade)
      this.ngZone.run(() => this.fuel.set(Math.max(0, current - 0.08)));
    }
  }

  // =================================================================
  // SISTEMA DE TIRO
  // =================================================================

  private shoot() {
    if (this.status() !== 'PLAYING') return;

    const now = Date.now();
    // Delay de 250ms entre tiros (Cadência de tiro)
    if (now - this.lastShotTime < 250) return;

    this.lastShotTime = now;
    const p = this.player();

    const bullet: GameEntity = {
      id: this.nextEntityId++,
      type: 'BULLET',
      x: p.x + p.width / 2 - 3, // Centralizado no bico do avião
      y: p.y,
      width: 6,
      height: 12,
      speedX: 0,
      active: true
    };

    // Adiciona direto ao array atual
    const currentBullets = this.bullets();
    currentBullets.push(bullet);
    this.bullets.set(currentBullets);
  }

  // =================================================================
  // COLISÕES (A PARTE CRÍTICA)
  // =================================================================

  private checkCollisions() {
    const p = this.player();
    const slices = this.riverSlices();
    const enemies = this.enemies();
    const bullets = this.bullets();

    // --- CONFIGURAÇÃO DE TOLERÂNCIA (O Segredo) ---
    // Quanto maior esse número, mais você pode "entrar" na parede sem morrer.
    // Como a div tem 40px e o avião visualmente uns 20px, vamos tirar 10px de cada lado.
    const HORIZONTAL_PADDING = 12;
    const VERTICAL_PADDING = 8;

    // 1. JOGADOR vs RIO (Paredes)
    // Filtra todas as fatias que o jogador toca verticalmente
    const collidingSlices = slices.filter(s =>
      p.y + p.height - VERTICAL_PADDING > s.y &&
      p.y + VERTICAL_PADDING < s.y + s.height
    );

    for (const slice of collidingSlices) {
      const leftWallX = (this.GAME_WIDTH * slice.leftBank) / 100;
      const rightWallX = this.GAME_WIDTH - ((this.GAME_WIDTH * slice.rightBank) / 100);

      // Verificação:
      // A ESQUERDA do jogador (+ tolerância) está dentro da parede esquerda?
      const hitLeft = (p.x + HORIZONTAL_PADDING) < leftWallX;

      // A DIREITA do jogador (- tolerância) está dentro da parede direita?
      const hitRight = (p.x + p.width - HORIZONTAL_PADDING) > rightWallX;

      if (hitLeft || hitRight) {
        this.handleCrash('Bateu na Margem');
        return;
      }
    }

    // 2. BALA vs INIMIGO (Mantemos preciso)
    bullets.forEach(b => {
      if (!b.active) return;
      enemies.forEach(e => {
        if (!e.active) return;

        // Tiros têm pouca tolerância (precisão)
        if (this.isColliding(b, e, 2)) {
          b.active = false;
          e.active = false;
          this.ngZone.run(() => {
            if (e.type === 'FUEL') this.score.update(s => s + 50);
            else this.score.update(s => s + 150);
          });
        }
      });
    });

    // 3. JOGADOR vs INIMIGO (Muito tolerante)
    enemies.forEach(e => {
      // Usamos a mesma tolerância alta das paredes para os inimigos
      if (e.active && this.isColliding(p, e, 10)) {
        if (e.type === 'FUEL') {
          e.active = false;
          this.ngZone.run(() => this.fuel.set(100));
        } else {
          this.handleCrash('Colisão com ' + e.type);
        }
      }
    });
  }

  private isColliding(a: any, b: any, padding: number): boolean {
    return (
      a.x + padding < b.x + b.width - padding &&
      a.x + a.width - padding > b.x + padding &&
      a.y + padding < b.y + b.height - padding &&
      a.y + a.height - padding > b.y + padding
    );
  }

  private handleCrash(reason: string) {
    console.warn('GAME OVER:', reason);
    this.ngZone.run(() => this.setGameOver());
    // Aqui você chamaria this.audio.play('explode')
  }

  // =================================================================
  // GERAÇÃO PROCEDURAL (O CÉREBRO DO RIO)
  // =================================================================

  private generateInitialMap() {
    const slices: RiverSlice[] = [];
    // Gera telas suficientes para preencher a altura
    const totalSlices = Math.ceil(this.GAME_HEIGHT / this.SLICE_HEIGHT) + 5;

    // Gera começando de baixo (onde o player está) para cima
    for (let i = 0; i < totalSlices; i++) {
      // Zona segura inicial (5 fatias retas)
      if (i < 10) {
        this.riverCenter = 50;
        this.riverWidth = 70;
      }
      const y = this.GAME_HEIGHT - (i * this.SLICE_HEIGHT);
      slices.push(this.createProceduralSlice(y));
    }
    this.riverSlices.set(slices);
  }

  private createProceduralSlice(yPosition: number): RiverSlice {
    // 1. Algoritmo de "Random Walk" suavizado
    const change = (Math.random() * 2 - 1);
    this.riverTrend += change * 0.4; // Ajuste a suavidade da curva aqui

    // Limita a tendência para não curvar demais
    if (this.riverTrend > 1.5) this.riverTrend = 1.5;
    if (this.riverTrend < -1.5) this.riverTrend = -1.5;

    // Aplica a tendência
    this.riverCenter += this.riverTrend;

    // 2. Varia a largura do rio
    this.riverWidth += (Math.random() * 2 - 1) * 0.5;

    // 3. Limites Hardcore (Não deixa sair da tela ou fechar)
    if (this.riverWidth < 25) this.riverWidth = 25; // Mínimo
    if (this.riverWidth > 85) this.riverWidth = 85; // Máximo

    if (this.riverCenter - this.riverWidth / 2 < 5) this.riverCenter += 1;
    if (this.riverCenter + this.riverWidth / 2 > 95) this.riverCenter -= 1;

    // 4. Calcula Margens
    const halfWidth = this.riverWidth / 2;
    const leftBank = Math.max(0, this.riverCenter - halfWidth);
    const rightBank = Math.max(0, 100 - (this.riverCenter + halfWidth));

    // 5. Tenta criar inimigos (Chance de 4%)
    if (Math.random() < 0.04) {
      this.spawnEnemyAt(yPosition, leftBank, rightBank);
    }

    return {
      id: this.nextSliceId++,
      y: yPosition,
      height: this.SLICE_HEIGHT,
      leftBank,
      rightBank
    };
  }

  private spawnEnemyAt(y: number, leftBankPerc: number, rightBankPerc: number) {
    // Converte % para Pixels para saber onde é seguro spawnar
    const leftLimit = (this.GAME_WIDTH * leftBankPerc / 100) + 10;
    const rightLimit = this.GAME_WIDTH - ((this.GAME_WIDTH * rightBankPerc / 100) + 10);
    const safeZoneWidth = rightLimit - leftLimit;

    if (safeZoneWidth < 60) return; // Rio muito estreito aqui, não spawna nada

    // Escolhe o tipo
    const rand = Math.random();
    let type: EntityType = 'ENEMY_SHIP';
    let width = 40;
    let height = 30;
    let speedX = 0;

    if (rand < 0.3) {
      type = 'FUEL';
      width = 30;
      height = 50;
    } else if (rand < 0.6) {
      type = 'ENEMY_HELI';
      width = 40;
      speedX = 2; // Helicóptero se move!
    }

    // Posição X aleatória dentro da zona segura
    const x = leftLimit + Math.random() * (safeZoneWidth - width);

    const enemy: GameEntity = {
      id: this.nextEntityId++,
      type,
      x,
      y, // Spawn na posição Y da fatia
      width,
      height,
      speedX,
      active: true
    };

    const currentEnemies = this.enemies();
    currentEnemies.push(enemy);
    // Não precisa dar .set() aqui, o loop principal vai pegar
  }

  // =================================================================
  // INPUT LISTENERS
  // =================================================================

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.status() === 'PLAYING') {
      this.keysPressed.add(e.code);

      // --- REMOVIDO: if (e.code === 'Space') this.shoot(); ---
      // Agora o gameLoop cuida disso olhando o keysPressed

    } else if (this.status() === 'GAME_OVER' && e.code === 'F5') {
      window.location.reload();
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keysPressed.delete(e.code);
  };

  private setupInputs() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
    }
  }

  private removeInputs() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
    }
  }
}
