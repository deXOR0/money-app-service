import { Injectable } from '@nestjs/common';
import { DataResponse } from './shared/dto/base.dto';
import { StatusCode } from './shared/status-codes';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getPrivate(): DataResponse<string> {
        return {
            status: {
                code: StatusCode.Success,
                message: 'success',
            },
            data: 'Welcome to private endpoint!',
        };
    }
}
