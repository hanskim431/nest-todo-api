import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './todo/interceptors/response-transform-interceptor';
import { LoggingInterceptor } from './todo/interceptors/logging-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseTransformInterceptor(new Reflector()));

  await app.listen(3000);
  console.log('##### localhost:3000 start #####');
}
bootstrap();
