import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaSemanalComponent } from './vista-semanal.component';

describe('VistaSemanalComponent', () => {
  let component: VistaSemanalComponent;
  let fixture: ComponentFixture<VistaSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
