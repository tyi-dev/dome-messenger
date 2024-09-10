import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export interface Response<T> {
   data: T;
}

@Injectable()
export class CommonResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
   intercept(context: ExecutionContext, next: CallHandler) {
      return next.handle().pipe(map((data) => ({ data })));
   }
}
