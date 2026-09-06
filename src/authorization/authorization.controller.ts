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
import { SetNicknameDto, UserExchangeDto } from './dto/authorization.dto';

@Controller('auth')
export class AuthorizationController {
    constructor(private authorizationService: AuthorizationService) {}

    @Get('id-exchange/:auth0Id')
    async exchangeId(
        @Headers('api-key') apiKey: string,
        @Param('auth0Id') auth0Id: string,
    ): Promise<DataResponse<UserExchangeDto>> {
        const user = await this.authorizationService.exchangeUserId(
            apiKey,
            auth0Id,
        );

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
            data: {
                userId: user.id,
                nickname: user.nickname,
            },
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
