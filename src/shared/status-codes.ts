export enum StatusCode {
    Success = 'SUCCESS',
    GeneralError = 'ERROR',
    UnauthorizedError = 'ERROR_UNAUTHORIZED',
    NewUserCreated = 'NEW_USER_CREATED',
    ExistingUserFound = 'EXISTING_USER_FOUND',
    UserNotFound = 'USER_NOT_FOUND',
}

export enum StatusMessage {
    Success = 'Success',
    GeneralError = 'An error occured',
}
