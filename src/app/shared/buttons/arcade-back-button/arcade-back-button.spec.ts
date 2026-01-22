import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeBackButton } from './arcade-back-button';

describe('ArcadeBackButton', () => {
  let component: ArcadeBackButton;
  let fixture: ComponentFixture<ArcadeBackButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcadeBackButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcadeBackButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
