import {
  CallHandler,
  ExecutionContext,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { UnauthorizedError } from '../common/errors/unauthorized.error';
import { EntityNotFoundError } from 'typeorm';

export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // CONSIDERATION: this needs improvement to have a more configurable error mapping to http exceptions
        // TODO: come here later for improvement
        // If the error is an instance of UnauthorizedError, throw an UnauthorizedException
        if (err instanceof UnauthorizedError) {
          throw new UnauthorizedException(err.message);
          // If the error is an instance of EntityNotFoundError, throw a NotFoundException
        } else if (err instanceof EntityNotFoundError) {
          throw new NotFoundException(err.message);
        }
        // If the error is an instance of Error, throw an InternalServerErrorException
        throw new InternalServerErrorException(err.message);
      }),
    );
  }
}
