import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakeGameBoard } from './skake-game-board';

describe('SkakeGameBoard', () => {
  let component: SkakeGameBoard;
  let fixture: ComponentFixture<SkakeGameBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkakeGameBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkakeGameBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
