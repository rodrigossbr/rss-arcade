import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGameHud } from './snake-game-hud';

describe('SnakeGameHud', () => {
  let component: SnakeGameHud;
  let fixture: ComponentFixture<SnakeGameHud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeGameHud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeGameHud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
