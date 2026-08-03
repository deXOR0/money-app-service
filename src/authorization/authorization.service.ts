import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizationService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    decodeToken(token: string): JwtPayload {
        return jwtDecode(token);
    }

    async findOrCreateUser(token: string): Promise<User> {
        const { sub: auth0Id } = this.decodeToken(token);

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
}
