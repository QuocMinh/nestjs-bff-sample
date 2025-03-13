import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmsHeadlessApiModule } from './cms-headless-api/cms-headless-api.module';
import { AllExceptionsFilter } from './core/filters/all-exception.filter';
import { TransformResponseInterceptor } from './core/iterceptors/transform-response.interceptor';

@Module({
  imports: [CmsHeadlessApiModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
