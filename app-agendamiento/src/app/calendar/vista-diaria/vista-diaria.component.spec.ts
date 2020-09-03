import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDiariaComponent } from './vista-diaria.component';

describe('VistaDiariaComponent', () => {
  let component: VistaDiariaComponent;
  let fixture: ComponentFixture<VistaDiariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaDiariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
