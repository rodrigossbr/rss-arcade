<div align="center">
  <a href="README.md">English</a> | <a href="README.pt-br.md">Português do Brasil</a>
</div>

# 🕹️ Rodrigo's Arcade

An interactive portfolio of retro games developed natively in the browser using modern **Angular**. This project demonstrates the application of scalable architectural patterns, reactive state management, and performance optimization for real-time frame rendering.

<div align="center">
  <img src="./docs/prints/home.png" alt="Homepage" width="80%">
  <p><em>Demonstration of the initial game selection screen.</em></p>
</div>

## 🛠️ Tech Stack

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

* **Framework:** [Angular 21](https://v21.angular.dev) (Standalone Components, Signals, New App Initializer)
* **State Management:** [@rssbr/state-store](https://www.npmjs.com/package/@rssbr/state-store) (Open source library for state management)

---

## 🎮 Included Games

### 1. Snake Classic 🐍
The classic snake game, reimagined with a grid-based architecture and reactive state control.
- **Highlights:** Scoring system, power-ups, and progressive difficulty increase.

<div align="center">
  <img src="./docs/prints/snake.png" alt="Snake Gameplay" width="800"/>
</div>

### 2. River Raid (Atari Tribute) ✈️
A continuous physics engine with infinite vertical scrolling.
- **Mechanics:** Procedural map generation (the river never repeats) and a continuous auto-fire system.
- **Technology:**
  - 60 FPS rendering loop executed via `requestAnimationFrame` outside the Angular Zone (`NgZone.runOutsideAngular`) for maximum performance.
  - AABB collision system with *Hitbox Padding* for a fairer and smoother gaming experience.
  - Entity System (Enemies, Fuel, Projectiles).
  - GPU-optimized animations (`will-change: transform`).

<div align="center">
  <img src="./docs/prints/river-raid.png" alt="River Raid Gameplay" width="800"/>
</div>

### 3. Checkers ♟️ *(In Development)*
- **Focus:** Artificial Intelligence and decision-making algorithms using **Minimax**.

---

## 🏗️ Project Architecture

The code was structured focusing on scalability and separation of concerns (Modular Monolith):

```text
src/app/
├── core/                  # Singleton services and global Store (Settings, Audio)
├── features/              # Encapsulated independent modules
│   ├── home/              # Arcade Dashboard Interface
│   ├── snake-game/        # Grid logic and Snake UI
│   └── river-raid/        # Physics Engine and River Raid UI
└── shared/                # Reusable components (e.g., Arcade Back Button)
```

### Key Patterns Used

- **Angular Signals:** Reactive, performant, and memory-leak-free state management.
- **Standalone Components:** Architecture without NgModules for greater clarity and optimized loading.
- **Lazy Loading:** Games are loaded on-demand through Angular's routing.
- **SCSS:** Component-based styling with nesting, variables, and a focus on the Retro/Neon theme.

## 🚀 How to Run Locally

1. Clone the repository and install the dependencies:

   ```bash
   npm install
   ```
   
2. Start the application, which should open in your browser:

   ```bash
   npm run start
   ```

<div align="center">
  <hr>
  <p>Developed with 💻 and ☕ by <strong>Rodrigo Silveira dos Santos</strong></p>
  <img src="https://img.shields.io/badge/Location-Imbé%2C%20RS-blue?style=flat-square&logo=googlemaps&logoColor=white" alt="Location">
  <a href="mailto:rodrigoss.br%40gmail.com" target="_blank">
    <img src="https://img.shields.io/badge/Email-rodrigoss.br%40gmail.com-green?style=flat-square&logo=gmail&logoColor=white" alt="Email">
  </a>
  <p>© 2026 All rights reserved.</p>
</div>
