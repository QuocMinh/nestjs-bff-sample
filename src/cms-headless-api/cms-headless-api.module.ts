import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CmsHeadlessApiController } from './cms-headless-api.controller';
import { CmsHeadlessApiService } from './cms-headless-api.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [CmsHeadlessApiController],
  providers: [CmsHeadlessApiService],
})
export class CmsHeadlessApiModule {}
