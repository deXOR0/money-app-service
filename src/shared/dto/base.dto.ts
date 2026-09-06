import { StatusCode } from '../status-codes';

export class Status {
    code: StatusCode;
    message: string;
}

export class BaseResponse {
    status: Status;
}

export class DataResponse<T> extends BaseResponse {
    data: T;
}
