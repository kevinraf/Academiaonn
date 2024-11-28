import { TestBed } from '@angular/core/testing';

import { EstadotenciaService } from './estadotencia.service';

describe('EstadotenciaService', () => {
  let service: EstadotenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadotenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
