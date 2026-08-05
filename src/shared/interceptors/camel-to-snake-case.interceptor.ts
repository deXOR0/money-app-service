import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { toSnake } from '../utils';

@Injectable()
export class CamelToSnakeCaseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (data && typeof data === 'object') {
                    return toSnake(data);
                }
                return data;
            }),
        );
    }
}
