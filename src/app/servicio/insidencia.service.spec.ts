import { TestBed } from '@angular/core/testing';

import { InsidenciaService } from './insidencia.service';

describe('InsidenciaService', () => {
  let service: InsidenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsidenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
