import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Booking } from './booking.entity';
import { Spot } from 'src/spots/spot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Booking, Spot])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
