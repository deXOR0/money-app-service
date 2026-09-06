import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnauthorizedException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from '../dto/base.dto';
import { StatusCode } from '../status-codes';
import { UnauthorizedAPIKeyException } from '../exceptions';

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

@Catch(UnauthorizedAPIKeyException)
export class UnauthorizedAPIKeyExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedAPIKeyException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const responseBody: BaseResponse = {
            status: {
                code: StatusCode.UnauthorizedAPIKeyError,
                message: exception.message,
            },
        };

        response.status(HttpStatus.UNAUTHORIZED).json(responseBody);
    }
}
