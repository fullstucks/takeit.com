import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRestaurantesComponent } from './mis-restaurantes.component';

describe('MisRestaurantesComponent', () => {
  let component: MisRestaurantesComponent;
  let fixture: ComponentFixture<MisRestaurantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisRestaurantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
