import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGameBoard } from './snake-game-board';

describe('GameBoard', () => {
  let component: SnakeGameBoard;
  let fixture: ComponentFixture<SnakeGameBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeGameBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeGameBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
