import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueoHorasComponent } from './bloqueo-horas.component';

describe('BloqueoHorasComponent', () => {
  let component: BloqueoHorasComponent;
  let fixture: ComponentFixture<BloqueoHorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueoHorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloqueoHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
