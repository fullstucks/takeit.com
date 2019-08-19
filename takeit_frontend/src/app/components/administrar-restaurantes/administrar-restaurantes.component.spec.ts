import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRestaurantesComponent } from './administrar-restaurantes.component';

describe('AdministrarRestaurantesComponent', () => {
  let component: AdministrarRestaurantesComponent;
  let fixture: ComponentFixture<AdministrarRestaurantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRestaurantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
