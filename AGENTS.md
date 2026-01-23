# 🕹️ Rodrigo's Arcade

Bem-vindo ao meu portfólio de jogos retro desenvolvidos com **Angular** moderno. Este projeto é um "Arcade Virtual" que explora diferentes mecânicas de jogos, desde manipulação de grid até física de alta performance, tudo rodando nativamente no navegador (SPA).

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## 🎮 Jogos Disponíveis

### 1. Snake Classic 🐍

O clássico jogo da cobrinha, reimaginado com uma arquitetura reativa.

- **Mecânica:** Baseada em Grid.
- **Destaques:** Sistema de High Score, Power-ups e controle de velocidade.

### 2. River Raid (Atari Style) ✈️

Um tributo ao clássico do Atari 2600.

- **Mecânica:** Scroll infinito vertical com geração procedural de mapa.
- **Tecnologia:**
  - Renderização otimizada a 60 FPS usando `requestAnimationFrame` fora do Angular Zone (`NgZone`).
  - Detecção de colisão AABB (Axis-Aligned Bounding Box).
  - Sistema de Entidades (Inimigos, Combustível, Projéteis).
  - Animações CSS via `will-change: transform` para uso da GPU.

### 3. Checkers (Damas) ♟️

*(Em Desenvolvimento)*

- **Planejado:** Inteligência Artificial usando algoritmo Minimax.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma estrutura moderna e modular focada em escalabilidade:

```text
src/app/
├── core/                  # Serviços Singleton (Audio, Storage Global)
├── features/              # Módulos independentes (Cada jogo é uma feature)
│   ├── home/              # Menu Principal (Arcade Dashboard)
│   ├── snake-game/        # Lógica e Componentes do Snake
│   └── river-raid/        # Engine de Física e Componentes do River Raid
└── shared/                # Componentes reutilizáveis (ex: Botão Voltar)
```

## Para rodar o arcade, execute os comandos

### Instale as dependências:

```bash
npm install
```

### Inicie o servidor de desenvolvimento:

```bash
npm run start
```

<div align="center"> 
  <p>Desenvolvido com 💻 e ☕ por <strong>Rodrigo Silveira dos Santos</strong></p> 
  <p>© 2026 Todos os direitos reservados.</p> 
</div>
