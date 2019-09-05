import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRestaurantesStatsComponent } from './administrar-restaurantes-stats.component';

describe('AdministrarRestaurantesStatsComponent', () => {
  let component: AdministrarRestaurantesStatsComponent;
  let fixture: ComponentFixture<AdministrarRestaurantesStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRestaurantesStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRestaurantesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
