import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    UnauthorizedAPIKeyExceptionFilter,
    UnauthorizedExceptionFilter,
} from './shared/filters/global-exception.filter';
import { SnakeToCamelCasePipe } from './shared/pipes/snake-to-camel-case.pipe';
import { CamelToSnakeCaseInterceptor } from './shared/interceptors/camel-to-snake-case.interceptor';
import { ConsoleLogger } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            logLevels: ['log'],
        }),
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new SnakeToCamelCasePipe());
    app.useGlobalFilters(
        new UnauthorizedExceptionFilter(),
        new UnauthorizedAPIKeyExceptionFilter(),
    );
    app.useGlobalInterceptors(
        new CamelToSnakeCaseInterceptor(),
        new LoggerInterceptor(),
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
