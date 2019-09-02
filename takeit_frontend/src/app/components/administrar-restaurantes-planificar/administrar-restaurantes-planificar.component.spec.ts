import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRestaurantesPlanificarComponent } from './administrar-restaurantes-planificar.component';

describe('AdministrarRestaurantesPlanificarComponent', () => {
  let component: AdministrarRestaurantesPlanificarComponent;
  let fixture: ComponentFixture<AdministrarRestaurantesPlanificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRestaurantesPlanificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRestaurantesPlanificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
