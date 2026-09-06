import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { promisify } from 'util';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
import { expressjwt } from 'express-jwt';

require('dotenv').config();

@Injectable()
export class AuthorizationGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.getArgByIndex(0);
        const res = context.getArgByIndex(1);

        const checkJwt = promisify(
            expressjwt({
                secret: expressJwtSecret({
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
                }) as GetVerificationKey,
                audience: process.env.AUTH0_AUDIENCE,
                issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                algorithms: ['RS256'],
            }),
        );
        try {
            await checkJwt(req, res);
            return true;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
