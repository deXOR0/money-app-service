import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './shared/filters/global-exception.filter';
import { SnakeToCamelCasePipe } from './shared/pipes/snake-to-camel-case.pipe';
import { CamelToSnakeCaseInterceptor } from './shared/interceptors/camel-to-snake-case.interceptor';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            json: true,
            logLevels: ['log'],
        }),
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new SnakeToCamelCasePipe());
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    app.useGlobalInterceptors(new CamelToSnakeCaseInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
