import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverRaidEnemies } from './river-raid-enemies';

describe('RiverRaidEnemies', () => {
  let component: RiverRaidEnemies;
  let fixture: ComponentFixture<RiverRaidEnemies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiverRaidEnemies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiverRaidEnemies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
