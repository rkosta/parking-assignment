import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        console.log('Data:', data);
        const result = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        console.log('Result:', result);
        return result;
      }),
    );
  }
}

// The `ClassConstructor` interface is a custom interface that defines a constructor for a class.
interface ClassConstructor {
  new (...args: any[]): {};
}

// The `Serialize` decorator is a custom decorator that uses the `UseInterceptors` decorator to apply
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
