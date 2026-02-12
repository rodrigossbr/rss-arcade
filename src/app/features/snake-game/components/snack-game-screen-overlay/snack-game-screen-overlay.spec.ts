import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackGameScreenOverlay } from './snack-game-screen-overlay';

describe('SnackGameScreenOverlay', () => {
  let component: SnackGameScreenOverlay;
  let fixture: ComponentFixture<SnackGameScreenOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackGameScreenOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackGameScreenOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
