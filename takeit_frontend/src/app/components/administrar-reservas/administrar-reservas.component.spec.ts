import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarReservasComponent } from './administrar-reservas.component';

describe('AdministrarReservasComponent', () => {
  let component: AdministrarReservasComponent;
  let fixture: ComponentFixture<AdministrarReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
