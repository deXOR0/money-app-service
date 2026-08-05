import {
    Body,
    Controller,
    Headers,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { BaseResponse, DataResponse, Status } from 'src/shared/dto/base.dto';
import { User } from 'src/shared/entities/user.entity';
import { StatusCode, StatusMessage } from 'src/shared/status-codes';
import { SetNicknameDto } from './dto/authorization.dto';

@Controller('auth')
@UseGuards(AuthorizationGuard)
export class AuthorizationController {
    constructor(private authorizationService: AuthorizationService) {}

    @Post('login')
    async login(
        @Headers('authorization') token: string,
    ): Promise<DataResponse<User>> {
        const user = await this.authorizationService.findOrCreateUser(token);

        let status: Status = {
            code: StatusCode.NewUserCreated,
            message: 'Created new user',
        };

        if (user.nickname) {
            status = {
                code: StatusCode.ExistingUserFound,
                message: 'Found existing user',
            };
        }

        return {
            status,
            data: user,
        };
    }

    @Patch('nickname')
    async setNickname(
        @Headers('authorization') token: string,
        @Body() setNicknameDto: SetNicknameDto,
    ): Promise<DataResponse<User> | BaseResponse> {
        const user = await this.authorizationService.setNickname(
            token,
            setNicknameDto,
        );

        if (user) {
            return {
                status: {
                    code: StatusCode.Success,
                    message: StatusMessage.Success,
                },
                data: user,
            };
        }

        return {
            status: {
                code: StatusCode.GeneralError,
                message: StatusMessage.GeneralError,
            },
        };
    }
}
