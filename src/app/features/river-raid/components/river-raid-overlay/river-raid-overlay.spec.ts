import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverRaidOverlay } from './river-raid-overlay';

describe('RiverRaidOverlay', () => {
  let component: RiverRaidOverlay;
  let fixture: ComponentFixture<RiverRaidOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiverRaidOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiverRaidOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
