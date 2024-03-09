import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const contextStatusCode = context.switchToHttp().getResponse().statusCode;
    const messageFromMetaData = this.reflector.get<string>(
      'response-message',
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => ({
        message: messageFromMetaData || data.message || null,
        statusCode: contextStatusCode,
        data: data.data || data,
      })),
    );
  }
}

// message: '성공적으로 모든 할일을 가져왔습니다!',
// data: foundAllTodos,
