import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from 'src/permissions/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // If the user is an admin, return true
    return request.currentUser && request.currentUser.role === Role.ADMIN;
  }
}
