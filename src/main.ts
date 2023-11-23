import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from './interceptors/exception-filter';
import { LoggingInterceptor } from './interceptors/logging-interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}

bootstrap();
