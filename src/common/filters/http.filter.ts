import { AxiosError } from 'axios';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(AxiosError)
export class HttpFilter implements ExceptionFilter<AxiosError> {
  catch(exception: AxiosError<{ message: string }>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log(exception);

    response.status(exception.response.status).json({
      status: 'failed',
      reason: exception.response.data.message,
      path: request.url,
    });
  }
}
