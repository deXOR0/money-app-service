import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { SetNicknameDto } from './dto/authorization.dto';
import { decodeToken } from 'src/shared/utils';

@Injectable()
export class AuthorizationService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findOrCreateUser(token: string): Promise<User> {
        const { sub: auth0Id } = decodeToken(token);

        const existingUser = await this.userRepository.findOneBy({
            auth0Id,
        });

        if (existingUser) {
            return existingUser;
        }

        const newUser = this.userRepository.create({
            auth0Id,
        });

        return await this.userRepository.save(newUser);
    }

    async setNickname(
        token: string,
        setNicknameDto: SetNicknameDto,
    ): Promise<User | null> {
        const { sub: auth0Id } = decodeToken(token);

        const user = await this.userRepository.findOneBy({ auth0Id });

        if (user) {
            user.nickname = setNicknameDto.nickname;

            return await this.userRepository.save(user);
        }

        return null;
    }
}
