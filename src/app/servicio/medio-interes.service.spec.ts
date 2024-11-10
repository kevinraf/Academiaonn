import { TestBed } from '@angular/core/testing';

import { MedioInteresService } from './medio-interes.service';

describe('MedioInteresService', () => {
  let service: MedioInteresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedioInteresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
