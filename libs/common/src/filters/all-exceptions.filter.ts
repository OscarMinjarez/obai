import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  error: T;
  timestamp: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorDetails: any = null;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as any;
      const isValidationError = Array.isArray(res.message);
      message = isValidationError ? 'Validation failed' : res.message || exception.message;
      errorDetails = isValidationError ? res.message : res;
    } else if (exception.__isAuthError || exception.code === 'invalid_credentials') {
      status = exception.status || HttpStatus.BAD_REQUEST;
      message = exception.message || 'Authentication error';
      errorDetails = { code: exception.code, details: exception.details };
    } else {
      this.logger.error(`Unhandled exception: ${exception.message}`, exception.stack);
      message = exception.message || 'Unexpected server error';
    }
    const apiResponse: ApiResponse = {
      success: false,
      statusCode: status,
      message,
      error: errorDetails,
      timestamp: new Date().toISOString(),
    };
    response.status(status).json(apiResponse);
  }

}
