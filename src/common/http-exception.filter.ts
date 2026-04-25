/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const res: any = exception.getResponse();

    let message: string = 'Error';
    let error: any = res;

    // 🔥 1. Unauthorized
    if (exception instanceof UnauthorizedException) {
      message = 'Unauthorized';
      error = null;
    }

    // 🔥 2. Validation error (class-validator)
    else if (Array.isArray(res?.message)) {
      message = 'Missing payload';

      const formattedError = {};

      res.message.forEach((msg: string) => {
        // contoh: "email must be an email"
        const field = msg.split(' ')[0];
        formattedError[field] = msg;
      });

      error = formattedError;
    }

    // 🔥 3. Default error
    else {
      message = res?.message || exception.message || 'Error';
      error = res;
    }

    response.status(status).json({
      code: status,
      message,
      error,
      data: null,
    });
  }
}
