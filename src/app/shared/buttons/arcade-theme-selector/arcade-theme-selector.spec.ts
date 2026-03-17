import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeThemeSelector } from './arcade-theme-selector';

describe('ArcadeThemeSelector', () => {
  let component: ArcadeThemeSelector;
  let fixture: ComponentFixture<ArcadeThemeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcadeThemeSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcadeThemeSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
