import { TestBed } from '@angular/core/testing';

import { InstitucionService } from './institucion.service';

describe('InstitucionService', () => {
  let service: InstitucionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitucionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
