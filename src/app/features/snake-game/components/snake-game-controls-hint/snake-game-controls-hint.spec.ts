import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGameControlsHint } from './snake-game-controls-hint';

describe('SnakeGameControlsHint', () => {
  let component: SnakeGameControlsHint;
  let fixture: ComponentFixture<SnakeGameControlsHint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeGameControlsHint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeGameControlsHint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
