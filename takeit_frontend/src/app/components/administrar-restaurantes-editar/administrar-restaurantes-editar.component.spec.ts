import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRestaurantesEditarComponent } from './administrar-restaurantes-editar.component';

describe('AdministrarRestaurantesEditarComponent', () => {
  let component: AdministrarRestaurantesEditarComponent;
  let fixture: ComponentFixture<AdministrarRestaurantesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRestaurantesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRestaurantesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
