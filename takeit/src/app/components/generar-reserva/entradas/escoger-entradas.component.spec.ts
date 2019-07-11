import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerEntradasComponent } from './escoger-entradas.component';

describe('EscogerEntradasComponent', () => {
  let component: EscogerEntradasComponent;
  let fixture: ComponentFixture<EscogerEntradasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscogerEntradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscogerEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
