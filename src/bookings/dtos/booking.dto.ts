import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { SpotDto } from '../../spots/dtos/spot-dto';

export class BookingDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the booking',
    type: 'number',
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the user who made the booking',
    type: 'number',
  })
  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'The start date and time of the booking',
    type: 'date-time',
  })
  @Expose()
  start: Date;

  @ApiProperty({
    example: '2022-01-01T01:00:00.000Z',
    description: 'The end date and time of the booking',
    type: 'date-time',
  })
  @Expose()
  end: Date;

  @ApiProperty({
    description: 'The  spot that was booked',
    type: 'SpotDto',
  })
  @Expose()
  @Type(() => SpotDto)
  spot: SpotDto;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'The date and time the booking was created',
    type: 'date-time',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'The date and time the booking was last updated',
    type: 'date-time',
  })
  @Expose()
  updatedAt: Date;
}
