import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverRaidHud } from './river-raid-hud';

describe('RiverRaidHud', () => {
  let component: RiverRaidHud;
  let fixture: ComponentFixture<RiverRaidHud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiverRaidHud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiverRaidHud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
