import { ExceptionFilter, Catch, HttpException, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      code: status,
      path: request.url,
      method: request.method,
      message: exception.message.error || exception.message || null,
      timestamp: new Date().toLocaleDateString()
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter'
    );

    response.status(status).json(errorResponse);
  }
}
