import {
    Body,
    Controller,
    Get,
    Headers,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { BaseResponse, DataResponse, Status } from 'src/shared/dto/base.dto';
import { User } from 'src/shared/entities/user.entity';
import { StatusCode, StatusMessage } from 'src/shared/status-codes';
import { SetNicknameDto, UserIdDto } from './dto/authorization.dto';

@Controller('auth')
export class AuthorizationController {
    constructor(private authorizationService: AuthorizationService) {}

    @Get('id-exchange/:auth0Id')
    async exchangeId(
        @Headers('api-key') apiKey: string,
        @Param('auth0Id') auth0Id: string,
    ): Promise<DataResponse<UserIdDto>> {
        const userId = await this.authorizationService.exchangeUserId(
            apiKey,
            auth0Id,
        );

        return {
            status: {
                code: userId ? StatusCode.Success : StatusCode.UserNotFound,
                message: userId ? StatusMessage.Success : 'User not found',
            },
            data: {
                userId: userId,
            },
        };
    }

    @Post('login')
    @UseGuards(AuthorizationGuard)
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
    @UseGuards(AuthorizationGuard)
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
