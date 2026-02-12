import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverRaidPlayerJet } from './river-raid-player-jet';

describe('RiverRaidPlayerJet', () => {
  let component: RiverRaidPlayerJet;
  let fixture: ComponentFixture<RiverRaidPlayerJet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiverRaidPlayerJet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiverRaidPlayerJet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
