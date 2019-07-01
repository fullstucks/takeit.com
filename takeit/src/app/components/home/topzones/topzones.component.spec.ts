import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopzonesComponent } from './topzones.component';

describe('TopzonesComponent', () => {
  let component: TopzonesComponent;
  let fixture: ComponentFixture<TopzonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopzonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopzonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
