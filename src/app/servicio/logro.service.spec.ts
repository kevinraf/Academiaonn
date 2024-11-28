import { TestBed } from '@angular/core/testing';

import { LogroService } from './logro.service';

describe('LogroService', () => {
  let service: LogroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
