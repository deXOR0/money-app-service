import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { UserModule } from 'src/user/user.module';
import { AuthorizationGuard } from './guards/authorization.guard';

@Module({
    imports: [UserModule],
    controllers: [AuthorizationController],
    providers: [AuthorizationService, AuthorizationGuard],
    exports: [AuthorizationGuard],
})
export class AuthorizationModule {}
