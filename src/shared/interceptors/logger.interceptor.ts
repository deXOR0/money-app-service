import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const { method, originalUrl, headers, body } = request;
        const startTime = Date.now();

        this.logger.log(`--> INCOMING REQUEST: ${method} ${originalUrl}`);
        this.logger.log(`Headers: ${JSON.stringify(headers)}`);
        this.logger.log(`Body: ${JSON.stringify(body)}`);

        return next.handle().pipe(
            tap((responseBody) => {
                const { statusCode } = response;
                const duration = Date.now() - startTime;

                this.logger.log(
                    `<-- OUTGOING RESPONSE: ${method} ${originalUrl} ${statusCode} - ${duration}ms`,
                );
                this.logger.log(
                    `Response Body: ${JSON.stringify(responseBody, null, 2)}`,
                );
            }),
        );
    }
}
