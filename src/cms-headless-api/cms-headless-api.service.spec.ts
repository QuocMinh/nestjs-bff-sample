import { Test, TestingModule } from '@nestjs/testing';
import { CmsHeadlessApiService } from './cms-headless-api.service';

describe('CmsHeadlessApiService', () => {
  let service: CmsHeadlessApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsHeadlessApiService],
    }).compile();

    service = module.get<CmsHeadlessApiService>(CmsHeadlessApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
