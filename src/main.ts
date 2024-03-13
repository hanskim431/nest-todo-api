import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './todo/interceptors/logging-interceptor';
import { ResponseTransformInterceptor } from './todo/interceptors/response-transform-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Swagger API 문서화 설정  */
  const config = new DocumentBuilder()
    .setTitle('Nest Todo Api')
    .setDescription('Nest JS로 만든 TODO API 문서입니다.')
    .setVersion('1.0.0.a')
    .addTag('TODO')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseTransformInterceptor(new Reflector()));

  await app.listen(3000);
  console.log('##### localhost:3000 start #####');
}
bootstrap();
