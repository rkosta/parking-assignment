import { Module } from '@nestjs/common';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spot } from './spot.entity';
import { Booking } from '../bookings/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spot, Booking])],
  controllers: [SpotsController],
  providers: [SpotsService],
})
export class SpotsModule {}
