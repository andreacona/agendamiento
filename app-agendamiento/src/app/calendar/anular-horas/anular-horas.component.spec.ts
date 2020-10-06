import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularHorasComponent } from './anular-horas.component';

describe('AnularHorasComponent', () => {
  let component: AnularHorasComponent;
  let fixture: ComponentFixture<AnularHorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularHorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
