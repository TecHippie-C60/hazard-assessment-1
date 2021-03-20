import { TestBed } from '@angular/core/testing';

import { TransformStructureService } from './transform-structure.service';

describe('TransformStructureService', () => {
  let service: TransformStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
