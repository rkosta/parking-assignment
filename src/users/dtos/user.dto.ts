import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  email: string;
  @Expose()
  isAdmin: boolean;
  @Exclude()
  token: string;
}
