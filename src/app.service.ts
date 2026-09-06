import { Injectable } from '@nestjs/common';
import { DataResponse } from './shared/dto/base.dto';
import { StatusCode, StatusMessage } from './shared/status-codes';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getPrivate(param: {
        isValue: boolean;
    }): DataResponse<{ isValue: boolean }> {
        return {
            status: {
                code: StatusCode.Success,
                message: StatusMessage.Success,
            },
            data: param,
        };
    }
}
