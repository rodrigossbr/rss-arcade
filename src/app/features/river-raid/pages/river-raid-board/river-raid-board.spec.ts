import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverRaidBoard } from './river-raid-board';

describe('RiverRaidBoard', () => {
  let component: RiverRaidBoard;
  let fixture: ComponentFixture<RiverRaidBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiverRaidBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiverRaidBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
