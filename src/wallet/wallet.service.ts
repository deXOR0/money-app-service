import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/wallet.dto';
import { Wallet } from 'src/shared/entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { decodeToken } from 'src/shared/utils';
import { Currency } from 'src/shared/entities/currency.entity';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
        @InjectRepository(Currency)
        private currencyRepository: Repository<Currency>,
    ) {}

    async createWallet(
        token: string,
        createWalletDto: CreateWalletDto,
    ): Promise<Wallet> {
        const { sub: auth0Id } = decodeToken(token);

        const user = await this.userRepository.findOne({
            select: {
                id: true,
            },
            where: {
                auth0Id,
            },
        });

        const currency = await this.currencyRepository.findOne({
            select: {
                id: true,
            },
            where: {
                code: createWalletDto.currencyCode,
            },
        });

        const wallet = this.walletRepository.create({
            ownerId: user?.id,
            currencyId: currency?.id,
            name: createWalletDto.name,
            icon: createWalletDto.icon,
            balance: createWalletDto.balance,
        });

        return this.walletRepository.save(wallet);
    }
}
