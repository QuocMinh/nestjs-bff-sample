import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (!/Cannot GET/.test(exception.message)) {
      this.logger.error('@AllExceptionsFilter > ' + exception.stack);
    }

    const responseBody = {
      success: false,
      message: {
        type: 'INTERNAL_SERVER_ERROR',
        errorMessage: exception.message,
      },
      data: null,
    };

    return httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
