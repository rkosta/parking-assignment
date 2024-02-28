import { Expose } from 'class-transformer';
import { Spot } from 'src/spots/spot.entity';
import { User } from 'src/users/user.entity';

export class BookingDto {
  @Expose()
  id: number;

  @Expose()
  user: User;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  spot: Spot;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
