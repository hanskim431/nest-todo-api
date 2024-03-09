import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTransformInterceptor } from './todo/interceptors/response-transform-interceptor';
import { ResponseMessage } from './todo/decorator/response-message-decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ResponseMessage('response 반환 성공')
  getHello(): string {
    return this.appService.getHello();
  }
}
