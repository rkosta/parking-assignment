import { Expose, Transform, Type } from 'class-transformer';
import { SpotDto } from 'src/spots/dtos/spot-dto';
import { UserDto } from 'src/users/dtos/user.dto';

export class BookingDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  @Type(() => SpotDto)
  spot: SpotDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
