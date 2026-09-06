import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/wallet.dto';
import { Wallet } from 'src/shared/entities/wallet.entity';
import { BaseResponse, DataResponse } from 'src/shared/dto/base.dto';
import { StatusCode, StatusMessage } from 'src/shared/status-codes';
import { AuthorizationGuard } from 'src/authorization/guards/authorization.guard';

@Controller('wallet')
@UseGuards(AuthorizationGuard)
export class WalletController {
    constructor(private walletService: WalletService) {}

    @Post()
    async createWallet(
        @Headers('authorization') token: string,
        @Body() createWalletDto: CreateWalletDto,
    ): Promise<DataResponse<Wallet> | BaseResponse> {
        const wallet = await this.walletService.createWallet(
            token,
            createWalletDto,
        );

        if (wallet) {
            return {
                status: {
                    code: StatusCode.Success,
                    message: StatusMessage.Success,
                },
                data: wallet,
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
