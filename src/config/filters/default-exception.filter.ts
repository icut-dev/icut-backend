/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
  parseMessages(messages: string[]) {
    return messages.reduce((acc: any, cur: string) => {
      const key = cur.split(' ').shift() ?? '';
      const hasKey = Object.keys(acc).includes(key);

      if (!hasKey) {
        acc[key] = [];
      }

      acc[key].push(cur.replace(key, '').slice(1));
      return acc;
    }, {});
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            message: exception.stack
          };

    const message = body?.message ? body.message : body;

    response.status(status).json({
      statusCode: status,
      body: {
        status: status === 500 ? 'fail' : 'error',
        errors: message
      }
    });
  }
}
