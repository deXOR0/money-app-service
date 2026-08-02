import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
    imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfigs()), AuthorizationModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
