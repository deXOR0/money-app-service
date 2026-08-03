import { Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { DataResponse, Status } from 'src/shared/dto/base.dto';
import { User } from 'src/shared/entities/user.entity';
import { StatusCode } from 'src/shared/status-codes';

@Controller('auth')
@UseGuards(AuthorizationGuard)
export class AuthorizationController {
    constructor(private authorizationService: AuthorizationService) {}

    @Post('login')
    async login(
        @Headers('authorization') token: string,
    ): Promise<DataResponse<User>> {
        const user = await this.authorizationService.findOrCreateUser(token);

        let status: Status;

        if (user.nickname) {
            status = {
                code: StatusCode.ExistingUserFound,
                message: 'Found existing user',
            };
        } else {
            status = {
                code: StatusCode.NewUserCreated,
                message: 'Created new user',
            };
        }

        return {
            status,
            data: user,
        };
    }
}
