import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverRaidSlices } from './river-raid-slices';

describe('RiverRaidSlices', () => {
  let component: RiverRaidSlices;
  let fixture: ComponentFixture<RiverRaidSlices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiverRaidSlices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiverRaidSlices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
