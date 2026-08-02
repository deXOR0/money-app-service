import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './shared/filters/global-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
