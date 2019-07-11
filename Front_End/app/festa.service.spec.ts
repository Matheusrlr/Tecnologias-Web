import { TestBed } from '@angular/core/testing';

import { FestaService } from './festa.service';

describe('FestaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FestaService = TestBed.get(FestaService);
    expect(service).toBeTruthy();
  });
});
