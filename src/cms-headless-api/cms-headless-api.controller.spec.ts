import { Test, TestingModule } from '@nestjs/testing';
import { CmsHeadlessApiController } from './cms-headless-api.controller';
import { CmsHeadlessApiService } from './cms-headless-api.service';

describe('CmsHeadlessApiController', () => {
  let controller: CmsHeadlessApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsHeadlessApiController],
      providers: [CmsHeadlessApiService],
    }).compile();

    controller = module.get<CmsHeadlessApiController>(CmsHeadlessApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
