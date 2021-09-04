import { TestBed } from '@angular/core/testing';

import { MarkdownItService } from './markdown-it.service';

describe('MarkdownItService', () => {
  let service: MarkdownItService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkdownItService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
