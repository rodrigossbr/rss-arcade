import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGameSettings } from './snake-game-settings';

describe('SnakeGameSettings', () => {
  let component: SnakeGameSettings;
  let fixture: ComponentFixture<SnakeGameSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeGameSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeGameSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
