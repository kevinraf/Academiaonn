import { TestBed } from '@angular/core/testing';

import { ComunicadoService } from './comunicado.service';

describe('ComunicadoService', () => {
  let service: ComunicadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
