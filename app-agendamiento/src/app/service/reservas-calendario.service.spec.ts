import { TestBed } from '@angular/core/testing';

import { ReservasCalendarioService } from './reservas-calendario.service';

describe('ReservasCalendarioService', () => {
  let service: ReservasCalendarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasCalendarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
