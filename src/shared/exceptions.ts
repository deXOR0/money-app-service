export class UnauthorizedAPIKeyException {
    message: string = '';

    constructor(message = 'Unauthorized api key') {
        this.message = message;
    }
}
