import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMensualComponent } from './vista-mensual.component';

describe('VistaMensualComponent', () => {
  let component: VistaMensualComponent;
  let fixture: ComponentFixture<VistaMensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaMensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
