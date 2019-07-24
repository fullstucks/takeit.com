import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRestauranteComponent } from './info-restaurante.component';

describe('InfoRestauranteComponent', () => {
  let component: InfoRestauranteComponent;
  let fixture: ComponentFixture<InfoRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
