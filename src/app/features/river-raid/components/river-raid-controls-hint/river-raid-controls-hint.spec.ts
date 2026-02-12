import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverRaidControlsHint } from './river-raid-controls-hint';

describe('RiverRaidControlsHint', () => {
  let component: RiverRaidControlsHint;
  let fixture: ComponentFixture<RiverRaidControlsHint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiverRaidControlsHint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiverRaidControlsHint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
