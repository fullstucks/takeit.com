import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopgyeComponent } from './topgye.component';

describe('TopgyeComponent', () => {
  let component: TopgyeComponent;
  let fixture: ComponentFixture<TopgyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopgyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopgyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
