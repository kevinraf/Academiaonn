import { TestBed } from '@angular/core/testing';

import { SeccionService } from './seccion.service';

describe('SeccionService', () => {
  let service: SeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
