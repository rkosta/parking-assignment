import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers['token'];
    if (token) {
      req.currentUser = await this.userService.findOneByToken(token);
    }
    next();
  }
}
