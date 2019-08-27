import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRestaurantesAgregarComponent } from './administrar-restaurantes-agregar.component';

describe('AdministrarRestaurantesAgregarComponent', () => {
  let component: AdministrarRestaurantesAgregarComponent;
  let fixture: ComponentFixture<AdministrarRestaurantesAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRestaurantesAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRestaurantesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
