import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers['token'];

    // If the token is not found, throw an UnauthorizedException
    // CONSIDERATION: for simplicity i'm assunming that all requests need to be authenticated
    // so if the token is not found, i'm throwing an UnauthorizedException
    // but if there are some requests that don't need to be authenticated, then
    // i should not throw an UnauthorizedException, but instead, just continue
    // to the next middleware. And I could use Guards to protect the routes
    // that need to be authenticated
    if (!token) {
      throw new UnauthorizedException();
    } else {
      const user = await this.userService.findOneByToken(token);
      // If the user is not found, throw an UnauthorizedException
      if (!user) {
        throw new UnauthorizedException();
      }
      req.currentUser = user;
    }
    next();
  }
}
