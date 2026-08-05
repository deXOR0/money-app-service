import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/guards/authorization.guard';
import { DataResponse } from './shared/dto/base.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/private')
    @UseGuards(AuthorizationGuard)
    getPrivate(
        @Body() param: { isValue: boolean },
    ): DataResponse<{ isValue: boolean }> {
        return this.appService.getPrivate(param);
    }
}
