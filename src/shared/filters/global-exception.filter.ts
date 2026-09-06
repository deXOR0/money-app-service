import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from '../dto/base.dto';
import { StatusCode } from '../status-codes';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const responseBody: BaseResponse = {
            status: {
                code: StatusCode.UnauthorizedError,
                message: (exception.getResponse() as UnauthorizedException)
                    .message,
            },
        };

        response.status(status).json(responseBody);
    }
}
