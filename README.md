# 🕹️ Rodrigo's Arcade

Um portfólio interativo de jogos retro desenvolvidos nativamente no navegador utilizando **Angular** moderno. Este projeto demonstra a aplicação de padrões de arquitetura escaláveis, gerenciamento de estado reativo e otimização de performance para renderização de frames em tempo real.

<div align="center">
  <img src="./docs/prints/home.png" alt="Página home" width="80%">
  <p><em>Demonstração da tela inicial de seleção de jogos.</em></p>
</div>

## 🛠️ Stack Tecnológica

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

* **Framework:** [Angular 21](https://v21.angular.dev) (Standalone Components, Signals, New App Initializer)
* **State Management:** [@rssbr/state-store](https://www.npmjs.com/package/@rssbr/state-store) (Biblioteca open source para gerenciamento de estados)

---

## 🎮 Jogos Inclusos

### 1. Snake Classic 🐍
O clássico jogo da cobrinha, reimaginado com uma arquitetura baseada em grid e controle de estado reativo.
- **Destaques:** Sistema de pontuação, power-ups e aumento progressivo de dificuldade.

<div align="center">
  <img src="./docs/prints/snake.png" alt="Gameplay do Snake" width="800"/>
</div>

### 2. River Raid (Atari Tribute) ✈️
Um motor de física contínua com rolagem vertical infinita.
- **Mecânica:** Geração procedural do mapa (o rio nunca se repete) e sistema de auto-fire contínuo.
- **Tecnologia:** - Loop de renderização a 60 FPS executado via `requestAnimationFrame` fora do Angular Zone (`NgZone.runOutsideAngular`) para máxima performance.
  - Sistema de colisão AABB com *Hitbox Padding* para uma experiência de jogo mais justa e fluida.
  - Sistema de Entidades (Inimigos, Combustível, Projéteis).
  - Animações otimizadas via GPU (`will-change: transform`).

<div align="center">
  <img src="./docs/prints/river-raid.png" alt="Gameplay do River Raid" width="800"/>
</div>

### 3. Checkers (Damas) ♟️ *(Em Desenvolvimento)*
- **Foco:** Inteligência Artificial e algoritmos de tomada de decisão utilizando **Minimax**.

---

## 🏗️ Arquitetura do Projeto

O código foi estruturado focando em escalabilidade e separação de responsabilidades (Modular Monolith):

```text
src/app/
├── core/                  # Serviços Singleton e Store global (Configurações, Áudio)
├── features/              # Módulos independentes encapsulados
│   ├── home/              # Interface do Arcade Dashboard
│   ├── snake-game/        # Lógica de Grid e UI do Snake
│   └── river-raid/        # Engine de Física e UI do River Raid
└── shared/                # Componentes reutilizáveis (ex: Arcade Back Button)
```

### Principais Padrões Utilizados

- **Angular Signals:** Gerenciamento de estado reativo, performático e livre de vazamentos de memória.
- **Standalone Components:** Arquitetura sem NgModules para maior clareza e carregamento otimizado.
- **Lazy Loading:** Os jogos são carregados sob demanda através do roteamento do Angular.
- **SCSS:** Estilização componentizada com aninhamento, variáveis e foco no tema Retro/Neon.

## 🚀 Como Executar Localmente

1. Clone o repositório e instale as dependências:

   ```bash
   npm install
   ```
   
2. Inicie a aplicação que já deve abrir o navegador:

   ```bash
   npm run start
   ```

<div align="center">
  <hr>
  <p>Desenvolvido com 💻 e ☕ por <strong>Rodrigo Silveira dos Santos</strong></p>
  <img src="https://img.shields.io/badge/Local-Imbé%2C%20RS-blue?style=flat-square&logo=googlemaps&logoColor=white" alt="Local">
  <a href="mailto:rodrigoss.br%40gmail.com" target="_blank">
    <img src="https://img.shields.io/badge/Email-rodrigoss.br%40gmail.com-green?style=flat-square&logo=gmail&logoColor=white" alt="Email">
  </a>
  <p>© 2026 Todos os direitos reservados.</p>
</div>
